import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { incidentsService } from '@/lib/supabase-service';
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
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { SeverityBadge } from '@/components/ui/SeverityBadge';
import { StatusBadge } from '@/components/ui/StatusBadge';

interface Incident {
  id: number;
  title: string;
  description: string;
  category: string;
  severity: string;
  status: string;
  reported_by: string;
  location: string | null;
  created_at: string;
  updated_at: string;
}

export default function IncidentsPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingIncident, setEditingIncident] = useState<Incident | null>(null);
  const [deletingIncident, setDeletingIncident] = useState<Incident | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    severity: 'low',
    status: 'open',
    reported_by: '',
    location: ''
  });
  const { toast } = useToast();

  const fetchIncidents = async () => {
    try {
      const response = await incidentsService.getAll();
      if (response.data) {
        setIncidents(response.data as unknown as Incident[]);
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch incidents', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  const openCreateDialog = () => {
    setEditingIncident(null);
    setFormData({
      title: '',
      description: '',
      category: '',
      severity: 'low',
      status: 'open',
      reported_by: '',
      location: ''
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (incident: Incident) => {
    setEditingIncident(incident);
    setFormData({
      title: incident.title,
      description: incident.description,
      category: incident.category,
      severity: incident.severity,
      status: incident.status,
      reported_by: incident.reported_by,
      location: incident.location || ''
    });
    setIsDialogOpen(true);
  };

  const openDeleteDialog = (incident: Incident) => {
    setDeletingIncident(incident);
    setIsDeleteOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editingIncident) {
        await incidentsService.update(editingIncident.id.toString(), {
          title: formData.title,
          description: DOMPurify.sanitize(formData.description),
          category: formData.category,
          severity: formData.severity,
          status: formData.status,
          location: formData.location || undefined
        });
        toast({ title: 'Success', description: 'Incident updated successfully' });
      } else {
        await incidentsService.create({
          title: formData.title,
          description: DOMPurify.sanitize(formData.description),
          category: formData.category,
          severity: formData.severity,
          reported_by: formData.reported_by,
          location: formData.location || undefined
        });
        toast({ title: 'Success', description: 'Incident created successfully' });
      }
      setIsDialogOpen(false);
      fetchIncidents();
    } catch (error: any) {
      console.error('Submit incident error details:', error);

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
    if (!deletingIncident) return;
    setIsSubmitting(true);

    try {
      await incidentsService.delete(deletingIncident.id.toString());
      toast({ title: 'Success', description: 'Incident deleted successfully' });
      setIsDeleteOpen(false);
      fetchIncidents();
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
      render: (incident: Incident) => (
        <div className="max-w-xs truncate font-medium">{incident.title}</div>
      )
    },
    { key: 'category', header: 'Category' },
    {
      key: 'severity',
      header: 'Severity',
      render: (incident: Incident) => <SeverityBadge severity={incident.severity} />
    },
    {
      key: 'status',
      header: 'Status',
      render: (incident: Incident) => <StatusBadge status={incident.status} />
    },
    {
      key: 'location',
      header: 'Location',
      render: (incident: Incident) => incident.location ? (
        <span className="flex items-center gap-1 text-muted-foreground">
          <LocationOnIcon className="w-3 h-3" />
          {incident.location}
        </span>
      ) : '-'
    },
    {
      key: 'created_at',
      header: 'Reported',
      render: (incident: Incident) => format(new Date(incident.created_at), 'MMM d, yyyy')
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Campus Reports</h1>
          <p className="text-muted-foreground">Track and manage campus incidents, facilities reports, and safety logs</p>
        </div>
        <Button onClick={openCreateDialog} className="bg-primary hover:bg-primary/90 text-white shadow-sm shadow-blue-100">
          <AddIcon className="w-4 h-4 mr-2" />
          Report Incident
        </Button>
      </div>

      <DataTable
        data={incidents}
        columns={columns}
        searchKey="title"
        searchPlaceholder="Search incidents..."
        isLoading={isLoading}
        emptyMessage="No incidents found"
        actions={(incident) => (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => openEditDialog(incident)} className="text-primary hover:text-primary hover:bg-primary/5 transition-colors">
              <EditIcon className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(incident)} className="text-secondary hover:text-secondary hover:bg-secondary/5 transition-colors">
              <DeleteIcon className="w-4 h-4" />
            </Button>
          </div>
        )}
      />

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>{editingIncident ? 'Edit Incident' : 'Report Incident'}</DialogTitle>
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
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  placeholder="e.g., Facilities, Discipline, Medical, Safety"
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
            </div>
            {editingIncident && (
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            {!editingIncident && (
              <div className="space-y-2">
                <Label htmlFor="reported_by">Reported By</Label>
                <Input
                  id="reported_by"
                  value={formData.reported_by}
                  onChange={(e) => setFormData({ ...formData, reported_by: e.target.value })}
                  required
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="location">Location (Optional)</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Building A, Floor 2"
              />
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
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-secondary hover:bg-secondary/90 text-white min-w-24">
                {isSubmitting && <CircularProgress size={16} color="inherit" className="mr-2" />}
                {editingIncident ? 'Update' : 'Report'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Incident</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deletingIncident?.title}"? This action cannot be undone.
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
