# Daily Log Feature Specification

## 1. Feature Overview

### 1.1 Purpose

The Daily Log is a core input mechanism for the Helix AI-Powered Wellbeing Companion, enabling users to track the three foundational pillars of the "Controlling the Controllables" philosophy:

- **Activity/Training**: Exercise sessions and daily movement
- **Nutrition**: Calorie and macronutrient intake
- **Sleep**: Rest and recovery metrics

This feature serves as the primary data collection point that feeds into the Proactive Wellbeing Engine, enabling personalized coaching, trend analysis, and goal tracking.

### 1.2 User Goals Supported

- **Bulking**: Track caloric surplus and progressive overload
- **Cutting/Weight Loss**: Monitor caloric deficit and adherence
- **Weight Gain**: Ensure consistent caloric intake
- **General Fitness**: Maintain balanced inputs across all three pillars
- **Body Recomposition**: Optimize protein intake and training consistency

### 1.3 Key Principles

- **Flexibility First**: Support both quick logging (30 seconds) and detailed tracking (5+ minutes)
- **Progressive Disclosure**: Simple interface by default, depth available on demand
- **Intelligent Validation**: Guide users toward their goals without blocking entry
- **Streak Motivation**: Gamify consistency to build sustainable habits
- **Cross-Platform Sync**: Seamless experience across web and mobile

---

## 2. User Experience & Interface

### 2.1 Layout Structure

The Daily Log page consists of three primary card-based sections arranged vertically:

```
┌─────────────────────────────────────┐
│  Daily Log - [Date Selector]       │
│  🔥 7 Day Streak                    │
├─────────────────────────────────────┤
│  💪 Activity & Training             │
│  [Quick/Detailed Toggle]            │
│  [Content based on mode]            │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│  🍎 Nutrition & Calories            │
│  [Quick/Detailed Toggle]            │
│  [Content based on mode]            │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│  😴 Sleep & Recovery                │
│  [Quick/Detailed Toggle]            │
│  [Content based on mode]            │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│  📊 Quick Insights (Mini Charts)    │
│  [7-day trends for each pillar]    │
└─────────────────────────────────────┘
```

### 2.2 Date Navigation

- **Default View**: Today's date
- **Date Selector**: Calendar picker allowing users to view/edit any past date
- **Quick Navigation**: "Yesterday" / "Today" / "Tomorrow" buttons
- **Visual Indicator**: Dates with complete logs show a checkmark badge

### 2.3 Streak Display

- **Prominent Position**: Top of page, immediately visible
- **Calculation**: Consecutive days where all three pillars are logged
- **Visual Feedback**:
  - 🔥 Fire emoji with number (e.g., "🔥 7 Day Streak")
  - Progress ring showing current streak vs personal best
  - Motivational message (e.g., "Keep it going!", "New record!")

---

## 3. Activity & Training Card

### 3.1 Quick Mode

**Purpose**: Log basic activity in under 30 seconds

**Fields**:

- **Activity Minutes** (number input)
  - Placeholder: "e.g., 45"
  - Helper text: "Total active minutes today"
- **Intensity** (segmented control)
  - Options: Light | Moderate | Intense
  - Default: Moderate

**Smart Features**:

- Auto-suggest based on user's `trainingPreferences.frequency` from profile
- Show remaining minutes if user has a daily activity goal

### 3.2 Detailed Mode

**Purpose**: Track comprehensive workout data

**Fields**:

- **Workout Type** (dropdown)
  - Options: Strength Training | Cardio | Sports | Flexibility | Mixed
  - Conditional fields based on selection
  
**For Strength Training**:

- **Exercises** (dynamic list)
  - Exercise Name (autocomplete from common exercises)
  - Sets × Reps × Weight
  - Add/Remove exercise buttons
  - Notes (optional text area)

**For Cardio**:

- **Activity** (dropdown): Running | Cycling | Swimming | Rowing | Other
- **Duration** (minutes)
- **Distance** (optional, with unit selector)
- **Average Heart Rate** (optional)

**For All Types**:

- **Total Duration** (auto-calculated or manual)
- **Perceived Exertion** (1-10 scale)
- **Notes** (text area)

**Toggle Mechanism**:

- Button: "Add Workout Details" (Quick → Detailed)
- Button: "Simplify" (Detailed → Quick)
- State persists per session (user preference remembered)

---

## 4. Nutrition & Calories Card

### 4.1 Quick Mode

**Purpose**: Log daily totals rapidly

**Fields**:

- **Total Calories** (number input)
  - Placeholder: "e.g., 2400"
  - Helper text: "Total calories consumed today"
- **Protein (g)** (number input)
  - Placeholder: "e.g., 180"
  - Helper text: "Grams of protein"

**Smart Features**:

- **Progress Indicators**:
  - Show target calories from `userProfile.nutritionPreferences.targetCalories`
  - Show target protein from `userProfile.nutritionPreferences.targetProtein`
  - Visual progress bar (green if within 10% of target, yellow if off by 10-20%, red if >20% off)
- **Remaining Display**: "450 calories remaining" or "150 calories over target"

### 4.2 Detailed Mode

**Purpose**: Track meal-by-meal breakdown

**Fields**:

- **Meals** (dynamic list of meal cards)
  - Meal Name (dropdown): Breakfast | Lunch | Dinner | Snack 1 | Snack 2 | Other
  - Time (time picker, optional)
  - Calories (number)
  - Protein (g)
  - Carbs (g, optional)
  - Fats (g, optional)
  - Notes (text area, optional)
  - Add/Remove meal buttons

**Auto-Calculations**:

- Total calories = sum of all meals
- Total macros = sum of all meals
- Macro split percentages (e.g., "40% Protein, 30% Carbs, 30% Fats")

**Smart Features**:

- "Copy from Yesterday" button to duplicate previous day's meals
- Meal templates (user can save frequent meals)

---

## 5. Sleep & Recovery Card

### 5.1 Quick Mode

**Purpose**: Log basic sleep duration

**Fields**:

- **Hours Slept** (number input with decimal support)
  - Placeholder: "e.g., 7.5"
  - Helper text: "Total hours of sleep"

**Smart Features**:

- Show target sleep hours from `userProfile.metrics.targetSleep`
- Visual indicator: ✅ if target met, ⚠️ if below target

### 5.2 Detailed Mode

**Purpose**: Track comprehensive sleep data

**Fields**:

- **Bedtime** (time picker)
- **Wake Time** (time picker)
- **Total Sleep** (auto-calculated from bedtime/wake time, or manual override)
- **Sleep Quality** (1-5 star rating)
  - 1 = Poor, 5 = Excellent
- **Interruptions** (number input)
  - Helper text: "Times you woke up during the night"
- **Notes** (text area)
  - Placeholder: "e.g., felt refreshed, woke up groggy, etc."

**Smart Features**:

- Detect if bedtime is before midnight (previous day) and adjust date accordingly
- Show sleep debt/surplus based on weekly average vs target

---

## 6. Quick Insights Section

### 6.1 Mini Trend Charts

Display 7-day sparkline charts for each pillar:

**Activity Chart**:

- X-axis: Last 7 days
- Y-axis: Activity minutes
- Target line overlay (from user goals)

**Nutrition Chart**:

- X-axis: Last 7 days
- Y-axis: Calories consumed
- Target range shaded area

**Sleep Chart**:

- X-axis: Last 7 days
- Y-axis: Hours slept
- Target line overlay

### 6.2 Weekly Summary Stats

- **Adherence Score**: Percentage of days all three pillars were logged
- **Goal Achievement**: Percentage of days targets were met
- **Trend Indicators**: ↑ Improving, → Stable, ↓ Declining

---

## 7. Data Model & Schema

### 7.1 Database Schema (Drizzle ORM)

```typescript
// packages/db/src/schema.ts

export const dailyLog = createTable(
  "daily_log",
  (d) => ({
    id: d.text("id").primaryKey().$defaultFn(() => createId()),
    userId: d
      .text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    logDate: d.date("log_date").notNull(), // Date being logged (not timestamp)
    
    // Activity fields
    activityMinutes: d.integer("activity_minutes"),
    activityIntensity: d.text("activity_intensity"), // "light" | "moderate" | "intense"
    activityDetails: d.jsonb("activity_details"), // Detailed workout data
    
    // Nutrition fields
    totalCalories: d.integer("total_calories"),
    totalProtein: d.integer("total_protein"),
    nutritionDetails: d.jsonb("nutrition_details"), // Meal-by-meal breakdown
    
    // Sleep fields
    sleepHours: d.real("sleep_hours"),
    sleepDetails: d.jsonb("sleep_details"), // Detailed sleep data
    
    // Metadata
    createdAt: d.timestamp("created_at").$defaultFn(() => new Date()).notNull(),
    updatedAt: d.timestamp("updated_at").$defaultFn(() => new Date()).notNull(),
  }),
  (t) => [
    index("daily_log_user_date_idx").on(t.userId, t.logDate),
    index("daily_log_date_idx").on(t.logDate),
  ]
);

// Unique constraint: one log per user per date
export const dailyLogRelations = relations(dailyLog, ({ one }) => ({
  user: one(user, { fields: [dailyLog.userId], references: [user.id] }),
}));
```

### 7.2 TypeScript Types

```typescript
// packages/api/src/types/daily-log.ts

export type ActivityIntensity = "light" | "moderate" | "intense";
export type WorkoutType = "strength" | "cardio" | "sports" | "flexibility" | "mixed";
export type MealType = "breakfast" | "lunch" | "dinner" | "snack1" | "snack2" | "other";

export interface Exercise {
  name: string;
  sets: number;
  reps: number;
  weight: number;
  weightUnit: "kg" | "lbs";
  notes?: string;
}

export interface ActivityDetails {
  workoutType: WorkoutType;
  totalDuration: number; // minutes
  perceivedExertion?: number; // 1-10
  notes?: string;
  
  // Strength training specific
  exercises?: Exercise[];
  
  // Cardio specific
  cardioActivity?: "running" | "cycling" | "swimming" | "rowing" | "other";
  distance?: number;
  distanceUnit?: "km" | "miles";
  averageHeartRate?: number;
}

export interface Meal {
  mealType: MealType;
  time?: string; // HH:mm format
  calories: number;
  protein: number;
  carbs?: number;
  fats?: number;
  notes?: string;
}

export interface NutritionDetails {
  meals: Meal[];
  totalCarbs?: number;
  totalFats?: number;
}

export interface SleepDetails {
  bedtime: string; // HH:mm format
  wakeTime: string; // HH:mm format
  quality: number; // 1-5
  interruptions?: number;
  notes?: string;
}

export interface DailyLogEntry {
  id: string;
  userId: string;
  logDate: string; // YYYY-MM-DD
  
  // Activity
  activityMinutes?: number;
  activityIntensity?: ActivityIntensity;
  activityDetails?: ActivityDetails;
  
  // Nutrition
  totalCalories?: number;
  totalProtein?: number;
  nutritionDetails?: NutritionDetails;
  
  // Sleep
  sleepHours?: number;
  sleepDetails?: SleepDetails;
  
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 8. API Specifications (tRPC)

### 8.1 Router Definition

```typescript
// packages/api/src/routers/daily-log.ts

import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

const exerciseSchema = z.object({
  name: z.string(),
  sets: z.number().int().positive(),
  reps: z.number().int().positive(),
  weight: z.number().positive(),
  weightUnit: z.enum(["kg", "lbs"]),
  notes: z.string().optional(),
});

const activityDetailsSchema = z.object({
  workoutType: z.enum(["strength", "cardio", "sports", "flexibility", "mixed"]),
  totalDuration: z.number().positive(),
  perceivedExertion: z.number().int().min(1).max(10).optional(),
  notes: z.string().optional(),
  exercises: z.array(exerciseSchema).optional(),
  cardioActivity: z.enum(["running", "cycling", "swimming", "rowing", "other"]).optional(),
  distance: z.number().positive().optional(),
  distanceUnit: z.enum(["km", "miles"]).optional(),
  averageHeartRate: z.number().int().positive().optional(),
});

const mealSchema = z.object({
  mealType: z.enum(["breakfast", "lunch", "dinner", "snack1", "snack2", "other"]),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
  calories: z.number().int().positive(),
  protein: z.number().positive(),
  carbs: z.number().positive().optional(),
  fats: z.number().positive().optional(),
  notes: z.string().optional(),
});

const nutritionDetailsSchema = z.object({
  meals: z.array(mealSchema),
  totalCarbs: z.number().positive().optional(),
  totalFats: z.number().positive().optional(),
});

const sleepDetailsSchema = z.object({
  bedtime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  wakeTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  quality: z.number().int().min(1).max(5),
  interruptions: z.number().int().min(0).optional(),
  notes: z.string().optional(),
});

export const dailyLogRouter = createTRPCRouter({
  // Create or update daily log
  upsert: protectedProcedure
    .input(
      z.object({
        logDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
        activityMinutes: z.number().int().min(0).optional(),
        activityIntensity: z.enum(["light", "moderate", "intense"]).optional(),
        activityDetails: activityDetailsSchema.optional(),
        totalCalories: z.number().int().min(0).optional(),
        totalProtein: z.number().positive().optional(),
        nutritionDetails: nutritionDetailsSchema.optional(),
        sleepHours: z.number().positive().max(24).optional(),
        sleepDetails: sleepDetailsSchema.optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { logDate, ...data } = input;
      
      // Check if log exists for this date
      const existing = await ctx.db.query.dailyLog.findFirst({
        where: (log, { and, eq }) =>
          and(eq(log.userId, ctx.session.user.id), eq(log.logDate, logDate)),
      });
      
      if (existing) {
        // Update existing log
        return await ctx.db
          .update(dailyLog)
          .set({ ...data, updatedAt: new Date() })
          .where(eq(dailyLog.id, existing.id))
          .returning();
      } else {
        // Create new log
        return await ctx.db.insert(dailyLog).values({
          userId: ctx.session.user.id,
          logDate,
          ...data,
        }).returning();
      }
    }),

  // Get log for specific date
  getByDate: protectedProcedure
    .input(z.object({ date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/) }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.dailyLog.findFirst({
        where: (log, { and, eq }) =>
          and(eq(log.userId, ctx.session.user.id), eq(log.logDate, input.date)),
      });
    }),

  // Get logs for date range (for charts/trends)
  getRange: protectedProcedure
    .input(
      z.object({
        startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.dailyLog.findMany({
        where: (log, { and, eq, gte, lte }) =>
          and(
            eq(log.userId, ctx.session.user.id),
            gte(log.logDate, input.startDate),
            lte(log.logDate, input.endDate)
          ),
        orderBy: (log, { asc }) => [asc(log.logDate)],
      });
    }),

  // Get current streak
  getStreak: protectedProcedure.query(async ({ ctx }) => {
    const logs = await ctx.db.query.dailyLog.findMany({
      where: (log, { eq }) => eq(log.userId, ctx.session.user.id),
      orderBy: (log, { desc }) => [desc(log.logDate)],
      limit: 365, // Check up to 1 year
    });
    
    // Calculate streak (consecutive days with all three pillars logged)
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    
    const today = new Date().toISOString().split("T")[0];
    let checkDate = new Date(today);
    
    for (const log of logs) {
      const logDateStr = log.logDate;
      const expectedDateStr = checkDate.toISOString().split("T")[0];
      
      if (logDateStr !== expectedDateStr) break;
      
      // Check if all three pillars are logged
      const isComplete =
        (log.activityMinutes !== null || log.activityDetails !== null) &&
        (log.totalCalories !== null || log.nutritionDetails !== null) &&
        (log.sleepHours !== null || log.sleepDetails !== null);
      
      if (isComplete) {
        currentStreak++;
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        break;
      }
      
      checkDate.setDate(checkDate.getDate() - 1);
    }
    
    return { currentStreak, longestStreak };
  }),

  // Get weekly summary stats
  getWeeklySummary: protectedProcedure.query(async ({ ctx }) => {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
    
    const logs = await ctx.db.query.dailyLog.findMany({
      where: (log, { and, eq, gte }) =>
        and(
          eq(log.userId, ctx.session.user.id),
          gte(log.logDate, sevenDaysAgo.toISOString().split("T")[0])
        ),
    });
    
    const userProfile = await ctx.db.query.userProfile.findFirst({
      where: (profile, { eq }) => eq(profile.userId, ctx.session.user.id),
    });
    
    // Calculate adherence and goal achievement
    const daysLogged = logs.length;
    const adherenceScore = (daysLogged / 7) * 100;
    
    let daysGoalsMet = 0;
    logs.forEach((log) => {
      const targets = userProfile?.nutritionPreferences as any;
      const metricsTargets = userProfile?.metrics as any;
      
      const caloriesOnTarget =
        targets?.targetCalories &&
        log.totalCalories &&
        Math.abs(log.totalCalories - targets.targetCalories) <=
          targets.targetCalories * 0.1;
      
      const sleepOnTarget =
        metricsTargets?.targetSleep &&
        log.sleepHours &&
        log.sleepHours >= metricsTargets.targetSleep;
      
      if (caloriesOnTarget && sleepOnTarget) daysGoalsMet++;
    });
    
    const goalAchievementScore = (daysGoalsMet / 7) * 100;
    
    return {
      adherenceScore: Math.round(adherenceScore),
      goalAchievementScore: Math.round(goalAchievementScore),
      daysLogged,
      daysGoalsMet,
    };
  }),
});
```

---

## 9. Validation & Business Rules

### 9.1 Field Validation Rules

**Activity**:

- `activityMinutes`: 0-1440 (max 24 hours)
- `activityIntensity`: Required if `activityMinutes` is provided
- `activityDetails.perceivedExertion`: 1-10 scale
- `activityDetails.exercises`: At least 1 exercise if workout type is "strength"

**Nutrition**:

- `totalCalories`: 0-10000 (reasonable upper limit)
- `totalProtein`: 0-500g (reasonable upper limit)
- If `nutritionDetails.meals` provided, sum must match `totalCalories` and `totalProtein`
- Macros validation: protein + carbs + fats should roughly equal total calories (allow 10% variance)

**Sleep**:

- `sleepHours`: 0-24
- `sleepDetails.quality`: 1-5 stars
- `sleepDetails.interruptions`: 0-50
- If `bedtime` and `wakeTime` provided, auto-calculate duration

### 9.2 Smart Validation (Non-Blocking Warnings)

**Activity Warnings**:

- ⚠️ "This is below your usual activity level" (if <50% of average)
- ⚠️ "This is significantly higher than usual - make sure to rest!" (if >150% of average)

**Nutrition Warnings**:

- ⚠️ "Calories are [X]% below your target" (if deficit >20%)
- ⚠️ "Protein intake is low for your goals" (if <80% of target)
- ⚠️ "High calorie day - is this intentional?" (if surplus >20%)

**Sleep Warnings**:

- ⚠️ "Sleep is below recommended 7 hours"
- ⚠️ "You've had <6 hours sleep for 3 consecutive days - prioritize rest!"

### 9.3 Goal Alignment Validation

Pull targets from `userProfile`:

- `nutritionPreferences.targetCalories`
- `nutritionPreferences.targetProtein`
- `metrics.targetSleep`
- `trainingPreferences.frequency` (weekly workout target)

Display progress indicators:

- ✅ Green: Within 10% of target
- ⚠️ Yellow: 10-20% off target
- ❌ Red: >20% off target

### 9.4 Auto-Calculations

**Nutrition**:

- If meals are logged, auto-sum to `totalCalories` and `totalProtein`
- Calculate macro split percentages
- Calculate remaining calories/protein for the day

**Sleep**:

- If `bedtime` and `wakeTime` provided, calculate `sleepHours`
- Handle overnight sleep (bedtime before midnight, wake time after)

**Activity**:

- If detailed workout logged, sum exercise durations to `activityMinutes`

---

## 10. Integration Points

### 10.1 Proactive Wellbeing Engine

**Data Flow**: Daily logs → Engine analysis → Personalized nudges

**Integration Requirements**:

- Send daily log completion events to engine
- Trigger analysis when all three pillars are logged
- Engine should access last 30 days of logs for trend analysis

**Example Nudges**:

- "You've hit your protein goal 6 days in a row! 🎉"
- "Your sleep has been declining this week. Try going to bed 30 minutes earlier."
- "You haven't logged activity in 3 days. Quick 20-minute walk?"

### 10.2 AI Advisory Suite

**Data Flow**: Daily logs → AI Coach context → Personalized recommendations

**Integration Requirements**:

- AI coaches should have read access to daily logs
- Use logs to inform coaching advice (e.g., "I see you're struggling with protein intake...")
- Suggest adjustments based on trends

### 10.3 User Dashboard & Analytics

**Data Flow**: Daily logs → Dashboard visualizations

**Integration Requirements**:

- Dashboard should display:
  - Input Adherence metrics (from daily logs)
  - Output Progress (weight, measurements) correlated with inputs
  - Trend charts for all three pillars
- "Conversational Insight Discovery" should query daily logs
  - Example: "Show me my weight trend for weeks I hit my protein goal vs weeks I didn't"

### 10.4 Wearable Integrations (Future Feature)

**Planned Integrations**:

- Oura Ring: Auto-populate sleep data
- Whoop: Auto-populate activity and sleep data
- Apple Health: Sync activity, nutrition, sleep
- MyFitnessPal: Import nutrition data

**Implementation Notes**:

- Keep as separate feature implementation
- Daily log should support both manual entry and auto-populated data
- User should be able to override auto-populated values
- Show data source indicator (e.g., "From Oura Ring" badge)

---

## 11. State Management

### 11.1 Client-Side State (React)

**State Structure**:

```typescript
interface DailyLogState {
  selectedDate: string; // YYYY-MM-DD
  currentLog: DailyLogEntry | null;
  isLoading: boolean;
  isSaving: boolean;
  
  // Mode toggles
  activityMode: "quick" | "detailed";
  nutritionMode: "quick" | "detailed";
  sleepMode: "quick" | "detailed";
  
  // Form state
  activityForm: ActivityFormData;
  nutritionForm: NutritionFormData;
  sleepForm: SleepFormData;
  
  // Validation
  validationErrors: Record<string, string[]>;
  validationWarnings: Record<string, string[]>;
  
  // Streak & stats
  streak: { current: number; longest: number };
  weeklySummary: WeeklySummaryData;
}
```

**State Management Library**: Use Zustand or React Context + useReducer

**Key Actions**:

- `setSelectedDate(date: string)`
- `loadLogForDate(date: string)`
- `updateActivityData(data: Partial<ActivityFormData>)`
- `updateNutritionData(data: Partial<NutritionFormData>)`
- `updateSleepData(data: Partial<SleepFormData>)`
- `toggleMode(pillar: "activity" | "nutrition" | "sleep")`
- `saveLog()`
- `validateForm()`

### 11.2 Optimistic Updates

- When user saves, immediately update UI
- Show loading spinner on save button
- If save fails, revert to previous state and show error toast
- Auto-save draft to localStorage every 30 seconds

### 11.3 Offline Support (Mobile Only)

- Queue mutations when offline
- Sync when connection restored
- Show offline indicator in UI
- Use React Query with persistence plugin

---

## 12. Platform-Specific Implementation

### 12.1 Web (Next.js + Shadcn/ui)

**Tech Stack**:

- Framework: Next.js (App Router)
- UI Components: Shadcn/ui
- Forms: React Hook Form + Zod validation
- State: Zustand
- API: tRPC client

**Component Structure**:

```
app/
  daily-log/
    page.tsx                 // Main page
    _components/
      date-selector.tsx
      streak-display.tsx
      activity-card.tsx
      nutrition-card.tsx
      sleep-card.tsx
      quick-insights.tsx
      mode-toggle.tsx
```

**Key Shadcn Components to Use**:

- `Card` for pillar sections
- `Input`, `Select`, `Slider` for form fields
- `Button` for actions
- `Calendar` for date picker
- `Tabs` for mode switching (alternative to toggle)
- `Progress` for goal indicators
- `Badge` for streak display
- `Chart` (Recharts) for mini trends

**Responsive Design**:

- Desktop: 3 cards side-by-side (if screen width allows), otherwise stacked
- Tablet: Stacked cards
- Mobile: Stacked cards, full-width

### 12.2 Mobile (React Native + Expo)

**Tech Stack**:

- Framework: React Native + Expo
- UI Components: [react-native-reusables](https://github.com/mrzachnugent/react-native-reusables) (React Native port of Shadcn/ui)
- Forms: React Hook Form
- State: Zustand (same store as web for consistency)
- API: tRPC client
- Offline: React Query with AsyncStorage persistence

**Component Structure**:

```
apps/mobile/src/
  screens/
    DailyLogScreen.tsx
  components/
    daily-log/
      DateSelector.tsx
      StreakDisplay.tsx
      ActivityCard.tsx
      NutritionCard.tsx
      SleepCard.tsx
      QuickInsights.tsx
      ModeToggle.tsx
```

**Native Features**:

- Use `DateTimePicker` for date/time selection
- Use `SegmentedControl` for intensity/mode toggles
- Use `ScrollView` with `RefreshControl` for pull-to-refresh
- Use `KeyboardAvoidingView` for form inputs
- Haptic feedback on streak milestones
- Local notifications for logging reminders

**Offline-First Approach**:

- All writes go to AsyncStorage first
- Background sync when online
- Show sync status indicator
- Conflict resolution: last-write-wins (since it's per-user data)

---

## 13. Notifications & Reminders

### 13.1 Reminder Types

**Daily Log Reminder**:

- **Trigger**: If user hasn't logged by 8 PM (customizable in settings)
- **Message**: "Don't break your streak! Log your day in 30 seconds ⚡"
- **Action**: Deep link to daily log page

**Streak Milestone**:

- **Trigger**: When user reaches 7, 30, 60, 90, 180, 365 day streaks
- **Message**: "🔥 Amazing! You've logged [X] days in a row!"
- **Action**: Celebration animation in app

**Goal Achievement**:

- **Trigger**: When user hits all three targets for the day
- **Message**: "Perfect day! All targets hit 🎯"
- **Action**: Show in-app badge

### 13.2 Notification Settings

User can configure:

- Enable/disable reminders
- Reminder time (default: 8 PM)
- Reminder frequency (daily, weekdays only, custom days)
- Quiet hours (no notifications during sleep)

### 13.3 Implementation

**Web**: Browser push notifications (requires permission)
**Mobile**: Expo Notifications API with local scheduling

---

## 14. Success Metrics & Analytics

### 14.1 Feature Success Metrics

- **Adoption**: % of active users who log at least once per week
- **Consistency**: Average streak length across all users
- **Completeness**: % of logs with all three pillars filled
- **Depth**: % of users using detailed mode vs quick mode
- **Retention**: 7-day, 30-day retention of users who start logging

### 14.2 User-Facing Metrics

- **Personal Best Streak**: Longest consecutive days logged
- **Total Days Logged**: Lifetime count
- **Adherence Rate**: % of days logged in last 30 days
- **Goal Hit Rate**: % of logged days where targets were met

### 14.3 Analytics Events to Track

```typescript
// Track these events for product analytics
{
  event: "daily_log_viewed",
  properties: { date: string }
}

{
  event: "daily_log_saved",
  properties: {
    date: string,
    pillars_logged: string[], // ["activity", "nutrition", "sleep"]
    mode_used: { activity: "quick" | "detailed", ... },
    time_to_complete: number, // seconds
  }
}

{
  event: "streak_milestone",
  properties: { streak_length: number }
}

{
  event: "mode_toggled",
  properties: { pillar: string, from: string, to: string }
}
```

---

## 15. Future Enhancements

### 15.1 Phase 2 Features

- **Voice Logging**: "Hey Helix, log 45 minutes of cardio and 2400 calories"
- **Photo Food Logging**: AI-powered calorie estimation from meal photos
- **Workout Templates**: Save and reuse common workout routines
- **Social Sharing**: Share streak milestones with community
- **Challenges**: Join 30-day logging challenges with friends

### 15.2 Phase 3 Features

- **Predictive Insights**: "Based on your patterns, you usually struggle with protein on Mondays. Here's a quick meal idea."
- **Adaptive Goals**: AI adjusts targets based on progress and feedback
- **Integration with Smart Scales**: Auto-log weight from connected devices
- **Meal Planning Integration**: Plan tomorrow's meals based on today's intake

---

## 16. Technical Considerations

### 16.1 Performance

- **Lazy Load Charts**: Only render Quick Insights when scrolled into view
- **Debounce Auto-Save**: Wait 500ms after last keystroke before saving draft
- **Optimize Queries**: Index on `userId` + `logDate` for fast lookups
- **Cache Streak Calculation**: Recompute only when new log is added

### 16.2 Security

- **Authorization**: Users can only access their own logs (enforced in tRPC middleware)
- **Input Sanitization**: Sanitize all text inputs (notes fields) to prevent XSS
- **Rate Limiting**: Limit API calls to prevent abuse (max 100 requests/minute per user)

### 16.3 Data Privacy

- **Encryption**: All logs encrypted at rest in database
- **Export**: Users can export all their logs as JSON/CSV
- **Deletion**: Users can delete individual logs or all historical data
- **No Training**: Daily log data never used for AI model training (per PRD policy)

### 16.4 Testing Strategy

- **Unit Tests**: Validation logic, calculations (macro sums, sleep duration)
- **Integration Tests**: API endpoints, database queries
- **E2E Tests**: Full user flows (log entry, streak calculation, chart rendering)
- **Accessibility**: WCAG 2.1 AA compliance for web, screen reader support for mobile

---

## 17. Advanced Features & Implementation Details

### 17.1 Adaptive Grace Period System

**Concept**: Streaks don't reset immediately when a user misses a day. Instead, they get grace periods that become stricter with repeated misses.

**Grace Period Rules**:

```typescript
interface GracePeriodState {
  consecutiveMisses: number; // How many days missed in a row
  graceDaysRemaining: number; // Days left before streak resets
  totalGraceDaysUsed: number; // Lifetime grace days used
}

// Grace period calculation
function calculateGracePeriod(consecutiveMisses: number): number {
  if (consecutiveMisses === 0) return 2; // First miss: 2 grace days
  if (consecutiveMisses === 1) return 1; // Second consecutive miss: 1 grace day
  return 0; // Third consecutive miss: streak resets
}
```

**User Experience**:

- **First Miss**: "You have 2 grace days to keep your streak alive! 🔥"
- **Second Miss**: "⚠️ Last chance! Log today or lose your 15-day streak."
- **Third Miss**: "Streak reset. Start fresh today! 💪"
- **Grace Day Used**: "Grace day used (1 remaining). Your streak is safe for now."

**Visual Indicators**:

- Streak display shows warning icon when on grace period
- Progress ring turns yellow/orange during grace period
- Notification sent when entering grace period

**Database Schema Addition**:

```typescript
export const streakState = createTable("streak_state", (d) => ({
  id: d.text("id").primaryKey(),
  userId: d.text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  currentStreak: d.integer("current_streak").default(0),
  longestStreak: d.integer("longest_streak").default(0),
  consecutiveMisses: d.integer("consecutive_misses").default(0),
  graceDaysRemaining: d.integer("grace_days_remaining").default(2),
  lastLogDate: d.date("last_log_date"),
  updatedAt: d.timestamp("updated_at").$defaultFn(() => new Date()),
}));
```

### 17.2 Leaderboard & Social Features

**Leaderboard Types**:

1. **Global Leaderboard**: Top 100 users by current streak
2. **Friends Leaderboard**: Compare with connected friends
3. **Community Leaderboard**: Within user's matched community groups

**Privacy Controls**:

- Users can opt-in/opt-out of leaderboards in settings
- Default: Visible to friends only
- Options: Public | Friends Only | Private

**Leaderboard UI** (Minimalistic):

```
┌─────────────────────────────────┐
│  🏆 Streak Leaderboard          │
├─────────────────────────────────┤
│  1. 🥇 Alex M.      127 days    │
│  2. 🥈 Jordan K.     98 days    │
│  3. 🥉 Sam L.        87 days    │
│  ...                            │
│  15. You            45 days 🔥  │
└─────────────────────────────────┘
```

**API Endpoint**:

```typescript
getLeaderboard: protectedProcedure
  .input(z.object({
    type: z.enum(["global", "friends", "community"]),
    limit: z.number().default(100),
  }))
  .query(async ({ ctx, input }) => {
    // Return ranked list of users with streaks
  }),
```

### 17.3 Future Date Blocking

**Rule**: Users cannot log data for future dates.

**Implementation**:

```typescript
// In API validation
if (new Date(input.logDate) > new Date()) {
  throw new TRPCError({
    code: "BAD_REQUEST",
    message: "Cannot log data for future dates. Please select today or a past date.",
  });
}
```

**UI Behavior**:

- Date picker disables all future dates
- If user somehow selects future date, show error toast
- "Tomorrow" button is hidden/disabled

### 17.4 Timezone Handling Scenarios

**Challenge**: User's "day" should be based on their current timezone, not server time.

**Scenario 1: User Travels East (e.g., NYC → Tokyo)**

- User in NYC (UTC-5) logs at 11 PM on Jan 15
- Flies to Tokyo (UTC+9), arrives at 2 PM on Jan 17 (loses Jan 16 due to time travel)
- **Solution**: Allow user to log for Jan 16 as a "missed day" with grace period
- System tracks timezone changes and adjusts streak calculation

**Scenario 2: User Travels West (e.g., Tokyo → NYC)**

- User in Tokyo logs at 11 PM on Jan 15
- Flies to NYC, arrives at 10 AM on Jan 15 (same day, gains time)
- **Solution**: User can still log for Jan 15 in NYC timezone (update existing log)
- No duplicate day issue

**Scenario 3: Midnight Edge Case**

- User logs at 11:55 PM in NYC
- Switches timezone to London (5 hours ahead, now 4:55 AM next day)
- **Solution**: Log is tied to the date in the timezone where it was created
- `logDate` is stored as YYYY-MM-DD (date only, no time)
- User's "current day" is calculated client-side based on device timezone

**Implementation Strategy**:

```typescript
// Client sends timezone with each request
interface LogRequest {
  logDate: string; // YYYY-MM-DD in user's local timezone
  timezone: string; // e.g., "America/New_York"
  // ... other fields
}

// Server validates date is "today or past" in user's timezone
function isValidLogDate(logDate: string, timezone: string): boolean {
  const userNow = DateTime.now().setZone(timezone);
  const logDateTime = DateTime.fromISO(logDate, { zone: timezone });
  return logDateTime <= userNow.startOf("day").plus({ days: 1 });
}
```

**Streak Calculation with Timezone**:

- Streak is based on consecutive calendar days in user's current timezone
- If user changes timezone, system recalculates streak based on new timezone
- Grace period applies if timezone change causes apparent "missed day"

### 17.5 CSV Bulk Import (Minimalistic)

**Purpose**: Allow users migrating from other apps (MyFitnessPal, Cronometer, etc.) to import historical data.

**CSV Format** (Simple, 3 columns minimum):

```csv
date,calories,protein,activity_minutes,sleep_hours
2026-01-01,2200,180,60,7.5
2026-01-02,2400,190,45,8.0
2026-01-03,2100,175,0,6.5
```

**Import UI** (Minimalistic):

```
┌─────────────────────────────────────┐
│  📥 Import Historical Logs          │
├─────────────────────────────────────┤
│  Upload CSV file with your data:    │
│  [Choose File] import.csv           │
│                                     │
│  📄 Download Template               │
│  📖 Format Guide                    │
│                                     │
│  [Cancel]  [Import]                 │
└─────────────────────────────────────┘
```

**Validation Rules**:

- Date must be in YYYY-MM-DD format
- No future dates allowed
- Duplicate dates: Skip or overwrite (user chooses)
- Invalid rows: Show error summary ("3 rows skipped due to invalid data")
- Max file size: 1MB (~10,000 rows)

**API Endpoint**:

```typescript
bulkImport: protectedProcedure
  .input(z.object({
    logs: z.array(z.object({
      logDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      totalCalories: z.number().optional(),
      totalProtein: z.number().optional(),
      activityMinutes: z.number().optional(),
      sleepHours: z.number().optional(),
    })),
    overwriteExisting: z.boolean().default(false),
  }))
  .mutation(async ({ ctx, input }) => {
    // Batch insert with conflict resolution
    const results = { imported: 0, skipped: 0, errors: [] };
    // ... implementation
    return results;
  }),
```

### 17.6 Gamification: Badges & Achievements

**Badge Categories**:

**Streak Badges**:

- 🔥 "Week Warrior" - 7-day streak
- 🔥 "Month Master" - 30-day streak
- 🔥 "Quarter Champion" - 90-day streak
- 🔥 "Year Legend" - 365-day streak

**Consistency Badges**:

- ✅ "Perfect Week" - All targets hit for 7 consecutive days
- ✅ "Perfect Month" - All targets hit for 30 consecutive days
- 📊 "Data Devotee" - 100 total days logged

**Pillar-Specific Badges**:

- 💪 "Iron Discipline" - 30 days of strength training logged
- 🥗 "Protein Pro" - Hit protein goal 30 days in a row
- 😴 "Sleep Champion" - 7+ hours sleep for 14 consecutive days

**Minimalistic Badge Display**:

```
┌─────────────────────────────────┐
│  🏅 Your Achievements (8/24)    │
├─────────────────────────────────┤
│  🔥 Week Warrior                │
│  ✅ Perfect Week                │
│  💪 Iron Discipline             │
│  🔒 Month Master (15 days away) │
│  🔒 Quarter Champion            │
└─────────────────────────────────┘
```

**Database Schema**:

```typescript
export const userBadges = createTable("user_badges", (d) => ({
  id: d.text("id").primaryKey(),
  userId: d.text("user_id").notNull().references(() => user.id),
  badgeId: d.text("badge_id").notNull(), // e.g., "week_warrior"
  earnedAt: d.timestamp("earned_at").notNull(),
  progress: d.integer("progress").default(0), // For locked badges
}));
```

### 17.7 Custom Pillars

**Feature**: Allow users to add custom tracking pillars beyond Activity, Nutrition, Sleep.

**Examples**:

- 💧 Water Intake (oz/liters)
- 🧘 Meditation (minutes)
- 📚 Reading (pages/minutes)
- 🚶 Steps (count)
- ☕ Caffeine (mg)

**User Experience**:

1. User goes to Settings → Daily Log Pillars
2. Sees default 3 pillars (Activity, Nutrition, Sleep) - cannot remove
3. Can add up to 3 custom pillars
4. For each custom pillar, configure:
   - Name (text)
   - Icon (emoji picker)
   - Unit (text, e.g., "oz", "minutes", "pages")
   - Target value (number, optional)
   - Include in streak calculation (yes/no)

**Database Schema**:

```typescript
export const customPillars = createTable("custom_pillars", (d) => ({
  id: d.text("id").primaryKey(),
  userId: d.text("user_id").notNull().references(() => user.id),
  name: d.text("name").notNull(),
  icon: d.text("icon").notNull(), // emoji
  unit: d.text("unit").notNull(),
  targetValue: d.real("target_value"),
  includeInStreak: d.boolean("include_in_streak").default(false),
  order: d.integer("order").notNull(), // display order
  createdAt: d.timestamp("created_at").$defaultFn(() => new Date()),
}));

export const customPillarLogs = createTable("custom_pillar_logs", (d) => ({
  id: d.text("id").primaryKey(),
  dailyLogId: d.text("daily_log_id").notNull().references(() => dailyLog.id),
  pillarId: d.text("pillar_id").notNull().references(() => customPillars.id),
  value: d.real("value").notNull(),
  notes: d.text("notes"),
}));
```

**UI Integration**:

- Custom pillars appear as additional cards below Sleep card
- Same quick/detailed mode toggle pattern
- Included in Quick Insights if enabled

### 17.8 Calendar Integration (Part of Integrations Feature)

**Purpose**: Suggest rest days based on user's calendar schedule.

**Integration Sources**:

- Google Calendar
- Apple Calendar
- Outlook Calendar

**Smart Suggestions**:

- **Busy Day Detected**: "You have 8 meetings today. Consider a light activity day."
- **Travel Day**: "Flight to Tokyo tomorrow. Plan a rest day or hotel workout."
- **Free Weekend**: "Clear schedule this Saturday. Perfect for a long training session!"

**Implementation** (High-Level):

```typescript
// Analyze calendar events for the day
function analyzeCalendarForDay(events: CalendarEvent[]): DayAnalysis {
  const totalMeetingMinutes = events.reduce((sum, e) => sum + e.duration, 0);
  const hasTravel = events.some(e => e.title.toLowerCase().includes("flight"));
  
  if (totalMeetingMinutes > 360) {
    return { suggestion: "rest", reason: "Heavy meeting schedule" };
  }
  if (hasTravel) {
    return { suggestion: "rest", reason: "Travel day" };
  }
  if (totalMeetingMinutes < 60) {
    return { suggestion: "intense", reason: "Light schedule" };
  }
  return { suggestion: "moderate", reason: "Normal day" };
}
```

**User Experience**:

- Show suggestion at top of Activity card: "💡 Suggested: Rest day (Heavy meeting schedule)"
- User can accept, ignore, or dismiss suggestion
- Suggestions don't override user's logged data

### 17.9 Rendering Strategy

**Decision**: Use **Server-Side Rendering (SSR)** for initial page load, then client-side for interactions.

**Rationale**:

- **SSR Benefits**: Faster initial load, better SEO (if daily log becomes shareable), pre-populated data
- **Client-Side Benefits**: Instant updates, optimistic UI, offline support

**Implementation** (Next.js App Router):

```typescript
// app/daily-log/page.tsx
export default async function DailyLogPage() {
  const today = new Date().toISOString().split("T")[0];
  const initialData = await api.dailyLog.getByDate.query({ date: today });
  
  return <DailyLogClient initialData={initialData} />;
}
```

- Server pre-fetches today's log data
- Client hydrates and takes over for all interactions
- Subsequent date changes are client-side only

---

## Appendix A: Example User Flows

### Flow 1: Quick Daily Log (30 seconds)

1. User opens app/web
2. Sees today's date pre-selected
3. Enters activity minutes: "60"
4. Selects intensity: "Moderate"
5. Enters total calories: "2200"
6. Enters protein: "170g"
7. Enters sleep hours: "7.5"
8. Taps "Save"
9. Sees streak increment to 8 days 🔥
10. Gets toast notification: "Great job! All targets hit today 🎯"

### Flow 2: Detailed Strength Training Log (5 minutes)

1. User opens daily log
2. Taps "Add Workout Details" on Activity card
3. Selects workout type: "Strength Training"
4. Adds exercises:
   - Bench Press: 4 sets × 8 reps × 185 lbs
   - Squats: 4 sets × 10 reps × 225 lbs
   - Deadlifts: 3 sets × 5 reps × 315 lbs
5. Sets perceived exertion: 8/10
6. Adds note: "Felt strong today, increased weight on bench"
7. Taps "Save"
8. Activity card shows summary: "Strength Training • 60 min • 3 exercises"

### Flow 3: Editing Past Entry

1. User taps date selector
2. Selects yesterday's date
3. Sees existing log data pre-filled
4. Updates sleep hours from 6.5 to 7
5. Adds note: "Forgot to log afternoon nap"
6. Taps "Save"
7. Gets confirmation: "Yesterday's log updated"

---

## Appendix B: UI Mockup Descriptions

### Daily Log Page (Web - Desktop View)

```
┌────────────────────────────────────────────────────────────────┐
│  Helix                                    [User Avatar] [Menu]  │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ← Jan 14    [Today: Jan 15, 2026]    Jan 16 →                │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  🔥 8 Day Streak                    Personal Best: 12    │ │
│  │  ████████░░░░ 67%                                         │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ │
│  │ 💪 Activity     │ │ 🍎 Nutrition    │ │ 😴 Sleep        │ │
│  │ [Quick|Detail]  │ │ [Quick|Detail]  │ │ [Quick|Detail]  │ │
│  │                 │ │                 │ │                 │ │
│  │ Minutes: [60]   │ │ Calories: [___] │ │ Hours: [7.5]    │ │
│  │ ○Light ●Mod     │ │ Protein: [___]  │ │                 │ │
│  │ ○Intense        │ │                 │ │ ✅ Target met   │ │
│  │                 │ │ 🎯 0/2200 cal   │ │                 │ │
│  │ ✅ 60/45 min    │ │ 🎯 0/180g pro   │ │                 │ │
│  │                 │ │                 │ │                 │ │
│  │    [Save]       │ │    [Save]       │ │    [Save]       │ │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘ │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  📊 7-Day Trends                                          │ │
│  │  Activity: ▁▂▃▅▇▆█  Nutrition: ▃▅▄▆▅▇█  Sleep: ▅▄▆▇▆▅█  │ │
│  │  Adherence: 86%  •  Goals Met: 71%  •  Trend: ↑          │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

---

## Appendix C: Database Migration

```sql
-- Migration: Create daily_log table

CREATE TABLE pg-drizzle_daily_log (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES pg-drizzle_user(id) ON DELETE CASCADE,
  log_date DATE NOT NULL,
  
  activity_minutes INTEGER,
  activity_intensity TEXT CHECK (activity_intensity IN ('light', 'moderate', 'intense')),
  activity_details JSONB,
  
  total_calories INTEGER,
  total_protein INTEGER,
  nutrition_details JSONB,
  
  sleep_hours REAL,
  sleep_details JSONB,
  
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  
  UNIQUE(user_id, log_date)
);

CREATE INDEX daily_log_user_date_idx ON pg-drizzle_daily_log(user_id, log_date);
CREATE INDEX daily_log_date_idx ON pg-drizzle_daily_log(log_date);

-- Add trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_daily_log_updated_at
BEFORE UPDATE ON pg-drizzle_daily_log
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
```

---

**Document Version**: 1.0  
**Last Updated**: 2026-01-15  
**Status**: Draft - Ready for AI Code Generation
