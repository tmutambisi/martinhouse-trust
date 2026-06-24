import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { newsService, uploadService } from '@/lib/supabase-service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CircularProgress from '@mui/material/CircularProgress';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PhotoIcon from '@mui/icons-material/Photo';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import React, { Suspense, lazy } from 'react';
import { cn } from '@/lib/utils';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = lazy(() => import('react-quill'));

interface NewsPost {
  id: string;
  title: string;
  slug: string;
  content?: string;
  category: string;
  author: string;
  cover_image: string | null;
  meta_description?: string | null;
  created_at: string;
  scheduled_at?: string | null;
  published_at?: string | null;
  status: 'published' | 'draft' | 'scheduled';
}

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

export default function NewsPage() {
  const [news, setNews] = useState<NewsPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingPost, setEditingPost] = useState<NewsPost | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '', // Maps to meta_description
    category: 'General News',
    author: 'Admin',
    content: '',
    cover_image: '',
    date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    external_link: '' // Not in DB yet, but in UI
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft' | 'scheduled'>('all');

  const { toast } = useToast();

  const fetchNews = async () => {
    try {
      const response = await newsService.getAll();
      if (response.data) {
        setNews(response.data as NewsPost[]);
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch news', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const resetForm = () => {
    setEditingPost(null);
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      category: 'General News',
      author: 'Admin',
      content: '',
      cover_image: '',
      date: new Date().toISOString().split('T')[0],
      external_link: ''
    });
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleEdit = (post: NewsPost) => {
    console.log('Editing post:', post); // Debug log
    setEditingPost(post);

    // Auto-generate excerpt from content if meta_description is missing
    let excerpt = post.meta_description || '';
    if (!excerpt && post.content) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = post.content;
      excerpt = tempDiv.textContent?.substring(0, 150) || '';
    }

    setFormData({
      title: post.title || '',
      slug: post.slug,
      excerpt: excerpt,
      category: post.category || 'General News',
      author: post.author || 'Admin',
      content: post.content || '',
      cover_image: post.cover_image || '',
      date: post.published_at
        ? new Date(post.published_at).toISOString().split('T')[0]
        : (post.scheduled_at ? new Date(post.scheduled_at).toISOString().split('T')[0] : (post.created_at ? new Date(post.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0])),
      external_link: ''
    });
    setImagePreview(post.cover_image || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      await newsService.delete(slug);
      toast({ title: 'Success', description: 'Post deleted' });
      fetchNews();
      if (editingPost?.slug === slug) resetForm();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete post', variant: 'destructive' });
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) return;
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (submitStatus: 'published' | 'draft') => {
    if (!formData.title) return toast({ title: 'Error', description: 'Title is required' });

    setIsSubmitting(true);
    try {
      let imageUrl = formData.cover_image;

      if (selectedImage) {
        setIsUploading(true);
        try {
          imageUrl = await uploadService.uploadImage(selectedImage, formData.title);
        } catch (e: any) {
          console.error("Image upload failed:", e);
          throw new Error(e.message || 'Image upload failed');
        } finally {
          setIsUploading(false);
        }
      }

      const slug = editingPost ? editingPost.slug : generateSlug(formData.title);
      const scheduledAt = formData.date ? new Date(formData.date).toISOString() : null;

      const isFuture = scheduledAt && new Date(scheduledAt) > new Date();
      const finalStatus = submitStatus === 'draft' ? 'draft' : (isFuture ? 'scheduled' : 'published');

      const payload = {
        title: formData.title,
        slug,
        content: DOMPurify.sanitize(formData.content),
        category: formData.category,
        author: formData.author,
        cover_image: imageUrl || undefined,
        meta_description: formData.excerpt,
        scheduled_at: scheduledAt,
        status: finalStatus
      };

      if (editingPost) {
        await newsService.update(editingPost.slug, payload);
        toast({ title: 'Success', description: 'Updated successfully' });
      } else {
        await newsService.create(payload);
        toast({ title: 'Success', description: 'Created successfully' });
      }

      resetForm();
      fetchNews();
    } catch (error: any) {
      console.error('Submit error details:', error);

      let errorMessage = 'Operation failed';
      if (typeof error === 'string') {
        errorMessage = error;
      } else if (error?.error_description) {
        errorMessage = error.error_description;
      } else if (error?.message) {
        errorMessage = error.message;
        if (error.details) errorMessage += ` (${error.details})`;
        if (error.hint) errorMessage += ` Hint: ${error.hint}`;
      } else if (typeof error === 'object') {
        errorMessage = JSON.stringify(error);
      }

      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredNews = news.filter(post => {
    if (filter === 'all') return true;
    return post.status === filter;
  });

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* HEADER & FORM SECTION */}
      <div className="space-y-6">
        <div>
          <h2 className="text-primary text-xl font-bold border-b pb-2 flex justify-between items-center">
            {editingPost ? 'Edit Post' : 'Post New Update'}
            {editingPost && (
              <Button variant="ghost" size="sm" onClick={resetForm} className="text-muted-foreground font-normal text-xs">
                Cancel Edit
              </Button>
            )}
          </h2>
          <p className="text-xs text-muted-foreground mt-1">Publish news with formatting (Bold, Italic, List)</p>
        </div>

        <div className="space-y-4 bg-white rounded-lg">
          {/* Title - Full Width */}
          <div className="space-y-1">
            <Label className="text-xs font-semibold text-gray-600">TITLE</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter post title"
              className="border-gray-300 focus:border-primary focus:ring-primary"
            />
          </div>

          {/* Meta Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-5 space-y-1">
              <Label className="text-xs font-semibold text-gray-600">EXCERPT (SHORT SUMMARY)</Label>
              <Input
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Brief description for previews"
                className="border-gray-300"
              />
            </div>

            <div className="md:col-span-3 space-y-1">
              <Label className="text-xs font-semibold text-gray-600">CATEGORY</Label>
              <Select
                value={formData.category}
                onValueChange={(val) => setFormData({ ...formData, category: val })}
              >
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="General News">General News</SelectItem>
                  <SelectItem value="Alert">Alert</SelectItem>
                  <SelectItem value="Offer">Offer</SelectItem>
                  <SelectItem value="Incident Report">Incident Report</SelectItem>
                  <SelectItem value="Latest Alerts">Latest Alerts</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2 space-y-1">
              <Label className="text-xs font-semibold text-gray-600">DATE</Label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="border-gray-300"
              />
              <p className="text-[10px] text-muted-foreground leading-tight italic">
                {formData.date && new Date(formData.date) > new Date()
                  ? "Post will be scheduled."
                  : "Post will publish now."}
              </p>
            </div>

            <div className="md:col-span-2 space-y-1">
              <Label className="text-xs font-semibold text-gray-600">EXTERNAL LINK</Label>
              <Input
                value={formData.external_link}
                onChange={(e) => setFormData({ ...formData, external_link: e.target.value })}
                placeholder="(Optional)"
                className="border-gray-300"
              />
            </div>
          </div>

          {/* Real Rich Text Editor */}
          <div className="space-y-1">
            <Label className="text-xs font-semibold text-gray-600">CONTENT</Label>
            <div className="editor-container">
              <Suspense fallback={<div className="h-[200px] w-full bg-gray-50 animate-pulse rounded-md border border-gray-200"></div>}>
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={(content) => setFormData({ ...formData, content })}
                  className="bg-white"
                  modules={{
                    toolbar: [
                      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                      ['link', 'image'],
                      ['clean']
                    ],
                  }}
                />
              </Suspense>
            </div>
            {/* Custom CSS for Quill to match design */}
            <style>{`
              .ql-toolbar { border-color: #e5e7eb !important; border-top-left-radius: 6px; border-top-right-radius: 6px; background: #f9fafb; }
              .ql-container { border-color: #e5e7eb !important; border-bottom-left-radius: 6px; border-bottom-right-radius: 6px; min-height: 200px; font-family: inherit; font-size: 0.875rem; }
              .ql-editor { min-height: 200px; }
            `}</style>
          </div>

          {/* Image Upload Strip */}
          <div className="flex items-center gap-4 bg-accent/10 border border-dashed border-accent/40 p-3 rounded-md">
            <span className="text-[10px] font-bold text-primary tracking-wider uppercase min-w-fit">COVER IMAGE</span>

            <div className="flex-1 flex items-center gap-3">
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageSelect}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="bg-white border-gray-300 text-xs h-7"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                Choose File
              </Button>
              <span className="text-xs text-gray-500 truncate">
                {selectedImage ? selectedImage.name : (imagePreview ? 'Current image set' : 'No file chosen')}
              </span>
            </div>

            {imagePreview && (
              <div className="relative group">
                <div className="w-10 h-10 rounded border overflow-hidden">
                  <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                </div>
                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => { setSelectedImage(null); setImagePreview(null); setFormData({ ...formData, cover_image: '' }); }}
                >
                  <CloseIcon className="w-3 h-3" />
                </Button>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 w-32"
              onClick={() => handleSubmit('draft')}
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress size={16} /> : 'Save as Draft'}
            </Button>
            <Button
              className="bg-secondary hover:bg-secondary/90 text-white w-32 shadow-md shadow-blue-100"
              onClick={() => handleSubmit('published')}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                editingPost
                  ? 'Update Post'
                  : (formData.date && new Date(formData.date) > new Date() ? 'Schedule Post' : 'Publish Now')
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* MANAGE NEWS SECTION */}
      <div className="mt-12 space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="text-primary font-bold text-lg">Manage News</h3>
          <div className="flex gap-1 bg-gray-100 p-1 rounded-md">
            {(['all', 'published', 'scheduled', 'draft'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={cn(
                  "px-3 py-1 text-xs rounded-sm transition-all capitalize font-medium",
                  filter === t
                    ? "bg-white text-primary shadow-sm"
                    : "text-gray-500 hover:text-gray-900"
                )}
              >
                {t} ({news.filter(n => t === 'all' ? true : n.status === t).length})
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredNews.length === 0 ? (
            <div className="text-center py-10 text-gray-400 bg-gray-50 rounded-lg border border-dashed">
              No news posts found in this category.
            </div>
          ) : (
            filteredNews.map((post) => (
              <div
                key={post.id}
                className="group bg-white border border-gray-100 rounded-lg p-3 flex gap-4 items-center hover:shadow-md transition-all duration-200 hover:border-[#10B981]/30"
              >
                {/* Thumbnail */}
                <div className="w-24 h-16 shrink-0 bg-gray-100 rounded-md overflow-hidden relative">
                  {post.cover_image ? (
                    <img src={post.cover_image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <PhotoIcon className="w-6 h-6" />
                    </div>
                  )}
                  {post.status === 'draft' && (
                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                      <Badge variant="secondary" className="text-[10px] h-5 px-1">DRAFT</Badge>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 truncate group-hover:text-[#10B981] transition-colors">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                    <span className="font-medium">
                      {post.status === 'scheduled' && post.scheduled_at
                        ? `Scheduled: ${format(new Date(post.scheduled_at), 'MM/dd/yyyy')}`
                        : format(new Date(post.published_at || post.created_at), 'MM/dd/yyyy')}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span className="uppercase text-[10px] tracking-wide bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">
                      {post.category}
                    </span>
                    {post.status === 'scheduled' && (
                      <Badge className="ml-2 bg-amber-500 text-white border-none text-[10px] h-5 px-1">SCHEDULED</Badge>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-primary" onClick={() => handleEdit(post)}>
                    <EditIcon className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-red-600" onClick={() => handleDelete(post.slug)}>
                    <DeleteIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
