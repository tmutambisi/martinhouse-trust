# Implementation Plan: Add Scheduling to Alerts, Incidents, and Offers

## Overview
This document outlines the steps needed to add scheduling functionality (similar to News) to Alerts, Incidents, and Offers in the SECURICO admin dashboard.

## Current State
- ✅ News posts have full scheduling support with `scheduled_for` and `status` fields
- ❌ Alerts, Incidents, and Offers do not have scheduling capabilities

## Required Changes

### 1. Database Migrations

Create migration files to add scheduling columns to each table:

#### `003_add_scheduling_to_alerts.sql`
```sql
ALTER TABLE alerts 
ADD COLUMN IF NOT EXISTS scheduled_for TIMESTAMP,
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'published' CHECK (status IN ('published', 'draft', 'scheduled'));

-- Update existing records to have 'published' status
UPDATE alerts SET status = 'published' WHERE status IS NULL;
```

#### `004_add_scheduling_to_incidents.sql`
```sql
ALTER TABLE incidents 
ADD COLUMN IF NOT EXISTS scheduled_for TIMESTAMP,
ADD COLUMN IF NOT EXISTS publish_status VARCHAR(20) DEFAULT 'published' CHECK (publish_status IN ('published', 'draft', 'scheduled'));

-- Note: Using 'publish_status' instead of 'status' since incidents already have a 'status' field for incident state
UPDATE incidents SET publish_status = 'published' WHERE publish_status IS NULL;
```

#### `005_add_scheduling_to_offers.sql`
```sql
ALTER TABLE offers 
ADD COLUMN IF NOT EXISTS scheduled_for TIMESTAMP,
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'published' CHECK (status IN ('published', 'draft', 'scheduled'));

UPDATE offers SET status = 'published' WHERE status IS NULL;
```

### 2. Backend Model Updates

Update each model file to include scheduling fields:

#### `server/src/models/alertModel.ts`
- Add `scheduled_for?: Date` and `status: 'published' | 'draft' | 'scheduled'` to interface
- Update `create` and `update` methods to handle these fields

#### `server/src/models/incidentModel.ts`
- Add `scheduled_for?: Date` and `publish_status: 'published' | 'draft' | 'scheduled'` to interface
- Update `create` and `update` methods to handle these fields

#### `server/src/models/offerModel.ts`
- Add `scheduled_for?: Date` and `status: 'published' | 'draft' | 'scheduled'` to interface
- Update `create` and `update` methods to handle these fields

### 3. Backend Controller Updates

Update controllers to handle scheduling logic:

#### `server/src/controllers/AlertController.ts`
- Modify `createAlert` to accept `scheduled_for` and `status`
- Modify `updateAlert` to accept `scheduled_for` and `status`
- Create `getAlertsAdmin` endpoint (similar to `/news/admin`) to return all alerts including drafts/scheduled
- Keep existing `getAlerts` endpoint to only return published alerts

#### `server/src/controllers/IncidentController.ts`
- Modify `createIncident` to accept `scheduled_for` and `publish_status`
- Modify `updateIncident` to accept `scheduled_for` and `publish_status`
- Create `getIncidentsAdmin` endpoint to return all incidents
- Keep existing `getIncidents` endpoint to only return published incidents

#### `server/src/controllers/OfferController.ts`
- Modify `createOffer` to accept `scheduled_for` and `status`
- Modify `updateOffer` to accept `scheduled_for` and `status`
- Create `getOffersAdmin` endpoint to return all offers
- Keep existing `getOffers` endpoint to only return published offers

### 4. Scheduler Service Update

Update `server/src/services/scheduler.ts` to check all entity types:

```typescript
import cron from 'node-cron';
import { NewsModel } from '../models/newsModel';
import { AlertModel } from '../models/alertModel';
import { IncidentModel } from '../models/incidentModel';
import { OfferModel } from '../models/offerModel';

export function startScheduler() {
  // Run every minute
  cron.schedule('* * * * *', async () => {
    const now = new Date();
    
    try {
      // Check and publish scheduled news
      await NewsModel.publishScheduledPosts(now);
      
      // Check and publish scheduled alerts
      await AlertModel.publishScheduledAlerts(now);
      
      // Check and publish scheduled incidents
      await IncidentModel.publishScheduledIncidents(now);
      
      // Check and publish scheduled offers
      await OfferModel.publishScheduledOffers(now);
      
      console.log(`[Scheduler] Checked for scheduled content at ${now.toISOString()}`);
    } catch (error) {
      console.error('[Scheduler] Error:', error);
    }
  });
  
  console.log('✅ Scheduler started - checking for scheduled content every minute');
}
```

### 5. Frontend API Client Updates

Update `admin-dashboard/dashboard/src/lib/api.ts`:

```typescript
// Alerts
async getAlerts() {
  return this.request<Array<{ 
    id: number; 
    title: string; 
    description: string; 
    severity: string; 
    cover_image: string | null; 
    created_at: string;
    scheduled_for?: string;
    status: 'published' | 'draft' | 'scheduled';
  }>>('/alerts/admin'); // Changed endpoint
}

async createAlert(data: { 
  title: string; 
  description: string; 
  severity: string; 
  cover_image?: string;
  scheduled_for?: string;
  status?: string;
}) {
  return this.request('/alerts', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

async updateAlert(id: number, data: { 
  title: string; 
  description: string; 
  severity: string; 
  cover_image?: string;
  scheduled_for?: string;
  status?: string;
}) {
  return this.request(`/alerts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// Similar updates for Incidents and Offers...
```

### 6. Frontend Page Updates

Update each admin page to include scheduling UI (similar to NewsPage):

#### `admin-dashboard/dashboard/src/pages/AlertsPage.tsx`
- Add `scheduled_for` and `status` to formData state
- Add scheduling UI section (date picker + status dropdown)
- Add status badge column to table
- Handle scheduling logic in submit handler

#### `admin-dashboard/dashboard/src/pages/IncidentsPage.tsx`
- Add `scheduled_for` and `publish_status` to formData state
- Add scheduling UI section
- Add publish status badge column to table
- Handle scheduling logic in submit handler

#### `admin-dashboard/dashboard/src/pages/OffersPage.tsx`
- Add `scheduled_for` and `status` to formData state
- Add scheduling UI section
- Add status badge column to table
- Handle scheduling logic in submit handler

## Implementation Order

1. **Database Migrations** - Run SQL migrations to add columns
2. **Backend Models** - Update model interfaces and methods
3. **Backend Controllers** - Add scheduling logic and admin endpoints
4. **Scheduler Service** - Extend to check all entity types
5. **Frontend API** - Update API client types and methods
6. **Frontend Pages** - Add scheduling UI to each page

## Testing Checklist

- [ ] Can create draft alerts/incidents/offers
- [ ] Can schedule alerts/incidents/offers for future publication
- [ ] Scheduled items appear with correct status badge
- [ ] Scheduler automatically publishes items at scheduled time
- [ ] Public endpoints only show published items
- [ ] Admin endpoints show all items (published, draft, scheduled)
- [ ] Can edit scheduled items before publication
- [ ] Can change scheduled time
- [ ] Can manually publish scheduled items

## Notes

- Incidents use `publish_status` instead of `status` because they already have a `status` field for tracking incident resolution state (open, in_progress, resolved, closed)
- All scheduling logic should mirror the existing News implementation for consistency
- Consider adding email notifications when scheduled content is published (future enhancement)
