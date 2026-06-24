import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { offersService, uploadService } from '@/lib/supabase-service';
import { DataTable } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import PercentIcon from '@mui/icons-material/Percent';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

interface Offer {
  id: number;
  title: string;
  description: string;
  percentage_off: string;
  cover_image: string | null;
  created_at: string;
}

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [deletingOffer, setDeletingOffer] = useState<Offer | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    percentage_off: '',
    cover_image: ''
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const fetchOffers = async () => {
    try {
      const response = await offersService.getAll();
      if (response.data) {
        setOffers(response.data as unknown as Offer[]);
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch offers', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const openCreateDialog = () => {
    setEditingOffer(null);
    setFormData({ title: '', description: '', percentage_off: '', cover_image: '' });
    setSelectedImage(null);
    setImagePreview(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (offer: Offer) => {
    setEditingOffer(offer);
    setFormData({
      title: offer.title,
      description: offer.description,
      percentage_off: parseFloat(offer.percentage_off).toString(),
      cover_image: offer.cover_image || ''
    });
    setSelectedImage(null);
    setImagePreview(offer.cover_image || null);
    setIsDialogOpen(true);
  };

  const openDeleteDialog = (offer: Offer) => {
    setDeletingOffer(offer);
    setIsDeleteOpen(true);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({ title: 'Error', description: 'Please select an image file', variant: 'destructive' });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast({ title: 'Error', description: 'Image size must be less than 5MB', variant: 'destructive' });
        return;
      }
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setFormData({ ...formData, cover_image: '' });
  };

  const handleUploadImage = async (file: File, title: string) => {
    setIsUploading(true);
    try {
      const url = await uploadService.uploadImage(file, title);
      return url;
    } catch (error) {
      console.error(error);
      throw new Error('Image upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const percentage = parseFloat(formData.percentage_off);
    if (isNaN(percentage) || percentage < 0 || percentage > 100) {
      toast({ title: 'Error', description: 'Percentage must be between 0 and 100', variant: 'destructive' });
      setIsSubmitting(false);
      return;
    }

    try {
      let imageUrl = formData.cover_image;

      // Upload image if a new one is selected
      if (selectedImage) {
        try {
          imageUrl = await handleUploadImage(selectedImage, formData.title);
          setFormData(prev => ({ ...prev, cover_image: imageUrl }));
        } catch (error) {
          toast({
            title: 'Error',
            description: 'Failed to upload image',
            variant: 'destructive'
          });
          setIsSubmitting(false);
          return;
        }
      }

      const data = {
        title: formData.title,
        description: DOMPurify.sanitize(formData.description),
        percentage_off: percentage,
        cover_image: imageUrl || undefined
      };

      if (editingOffer) {
        await offersService.update(editingOffer.id.toString(), data);
        toast({ title: 'Success', description: 'Offer updated successfully' });
      } else {
        await offersService.create(data);
        toast({ title: 'Success', description: 'Offer created successfully' });
      }
      setIsDialogOpen(false);
      setSelectedImage(null);
      setImagePreview(null);
      fetchOffers();
    } catch (error: any) {
      console.error('Submit offer error details:', error);

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

  const handleDelete = async () => {
    if (!deletingOffer) return;
    setIsSubmitting(true);

    try {
      await offersService.delete(deletingOffer.id.toString());
      toast({ title: 'Success', description: 'Offer deleted successfully' });
      setIsDeleteOpen(false);
      fetchOffers();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Delete failed',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns = [
    {
      key: 'title',
      header: 'Title',
      render: (offer: Offer) => (
        <div className="max-w-xs truncate font-medium">{offer.title}</div>
      )
    },
    {
      key: 'description',
      header: 'Description',
      render: (offer: Offer) => (
        <div className="max-w-xs truncate text-muted-foreground">{offer.description}</div>
      )
    },
    {
      key: 'percentage_off',
      header: 'Scholarship / Discount',
      render: (offer: Offer) => (
        <Badge className="bg-primary text-white border-primary border">
          <PercentIcon className="w-3 h-3 mr-1" />
          {parseFloat(offer.percentage_off).toFixed(0)}% Value
        </Badge>
      )
    },
    {
      key: 'created_at',
      header: 'Created',
      render: (offer: Offer) => format(new Date(offer.created_at), 'MMM d, yyyy')
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Special Programmes / Scholarships</h1>
          <p className="text-muted-foreground">Manage school enrichment programmes, special courses, and fee scholarships</p>
        </div>
        <Button onClick={openCreateDialog} className="bg-primary hover:bg-primary/90 text-white shadow-sm shadow-blue-100">
          <AddIcon className="w-4 h-4 mr-2" />
          Add Programme / Scholarship
        </Button>
      </div>

      <DataTable
        data={offers}
        columns={columns}
        searchKey="title"
        searchPlaceholder="Search programmes..."
        isLoading={isLoading}
        emptyMessage="No programmes or scholarships found"
        actions={(offer) => (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => openEditDialog(offer)} className="text-primary hover:text-primary hover:bg-primary/5 transition-colors">
              <EditIcon className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(offer)} className="text-secondary hover:text-secondary hover:bg-secondary/5 transition-colors">
              <DeleteIcon className="w-4 h-4" />
            </Button>
          </div>
        )}
      />

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingOffer ? 'Edit Programme / Scholarship' : 'Create Programme / Scholarship'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="percentage_off">Scholarship Value / Fee Discount (%)</Label>
              <div className="relative">
                <Input
                  id="percentage_off"
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={formData.percentage_off}
                  onChange={(e) => setFormData({ ...formData, percentage_off: e.target.value })}
                  required
                  className="pr-10"
                />
                <PercentIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cover_image">Cover Image</Label>
              {imagePreview ? (
                <div className="relative bg-muted/10 rounded-lg border">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-contain rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={handleRemoveImage}
                  >
                    <CloseIcon className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed rounded-lg p-6">
                  <label
                    htmlFor="cover_image"
                    className="flex flex-col items-center justify-center cursor-pointer"
                  >
                    <CloudUploadIcon className="w-8 h-8 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </span>
                    <span className="text-xs text-muted-foreground mt-1">
                      PNG, JPG, GIF up to 5MB
                    </span>
                  </label>
                  <input
                    id="cover_image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting || isUploading} className="bg-secondary hover:bg-secondary/90 text-white min-w-24">
                {(isSubmitting || isUploading) && <CircularProgress size={16} color="inherit" className="mr-2" />}
                {isUploading ? 'Uploading...' : editingOffer ? 'Update' : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Programme / Scholarship</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deletingOffer?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-secondary hover:bg-secondary/90 text-white">
              {isSubmitting && <CircularProgress size={16} color="inherit" className="mr-2" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
