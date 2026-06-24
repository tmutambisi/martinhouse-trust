import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { alertsService, uploadService } from '@/lib/supabase-service';
import { DataTable } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { SeverityBadge } from '@/components/ui/SeverityBadge';

interface Alert {
  id: number;
  title: string;
  description: string;
  severity: string;
  cover_image: string | null;
  created_at: string;
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingAlert, setEditingAlert] = useState<Alert | null>(null);
  const [deletingAlert, setDeletingAlert] = useState<Alert | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    severity: 'low',
    cover_image: ''
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const fetchAlerts = async () => {
    try {
      const response = await alertsService.getAll();
      if (response.data) {
        setAlerts(response.data as Alert[]);
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch alerts', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const openCreateDialog = () => {
    setEditingAlert(null);
    setFormData({ title: '', description: '', severity: 'low', cover_image: '' });
    setSelectedImage(null);
    setImagePreview(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (alert: Alert) => {
    setEditingAlert(alert);
    setFormData({
      title: alert.title,
      description: alert.description,
      severity: alert.severity,
      cover_image: alert.cover_image || ''
    });
    setSelectedImage(null);
    setImagePreview(alert.cover_image || null);
    setIsDialogOpen(true);
  };

  const openDeleteDialog = (alert: Alert) => {
    setDeletingAlert(alert);
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
        severity: formData.severity,
        cover_image: imageUrl || undefined
      };

      if (editingAlert) {
        await alertsService.update(editingAlert.id.toString(), data);
        toast({ title: 'Success', description: 'Alert updated successfully' });
      } else {
        await alertsService.create(data);
        toast({ title: 'Success', description: 'Alert created successfully' });
      }
      setIsDialogOpen(false);
      setSelectedImage(null);
      setImagePreview(null);
      fetchAlerts();
    } catch (error: any) {
      console.error('Submit alert error details:', error);

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
    if (!deletingAlert) return;
    setIsSubmitting(true);

    try {
      await alertsService.delete(deletingAlert.id.toString());
      toast({ title: 'Success', description: 'Alert deleted successfully' });
      setIsDeleteOpen(false);
      fetchAlerts();
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
      render: (alert: Alert) => (
        <div className="max-w-xs truncate font-medium">{alert.title}</div>
      )
    },
    {
      key: 'description',
      header: 'Description',
      render: (alert: Alert) => (
        <div className="max-w-xs truncate text-muted-foreground">{alert.description}</div>
      )
    },
    {
      key: 'severity',
      header: 'Severity',
      render: (alert: Alert) => <SeverityBadge severity={alert.severity} />
    },
    {
      key: 'created_at',
      header: 'Created',
      render: (alert: Alert) => format(new Date(alert.created_at), 'MMM d, yyyy')
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Alerts</h1>
          <p className="text-muted-foreground">Manage school announcements and notifications</p>
        </div>
        <Button onClick={openCreateDialog} className="bg-primary hover:bg-primary/90 text-white shadow-sm shadow-blue-100">
          <AddIcon className="w-4 h-4 mr-2" />
          Add Alert
        </Button>
      </div>

      <DataTable
        data={alerts}
        columns={columns}
        searchKey="title"
        searchPlaceholder="Search alerts..."
        isLoading={isLoading}
        emptyMessage="No alerts found"
        actions={(alert) => (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => openEditDialog(alert)} className="text-primary hover:text-primary hover:bg-primary/5 transition-colors">
              <EditIcon className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(alert)} className="text-secondary hover:text-secondary hover:bg-secondary/5 transition-colors">
              <DeleteIcon className="w-4 h-4" />
            </Button>
          </div>
        )}
      />

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingAlert ? 'Edit Alert' : 'Create Alert'}</DialogTitle>
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
              <Label htmlFor="severity">Severity</Label>
              <Select value={formData.severity} onValueChange={(value) => setFormData({ ...formData, severity: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
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
                {isUploading ? 'Uploading...' : editingAlert ? 'Update' : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Alert</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deletingAlert?.title}"? This action cannot be undone.
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
