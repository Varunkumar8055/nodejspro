class Reminder {
    id: string;
    title: string;
    description: string;
    date: Date;
    completed: boolean;

    constructor(id: string, title: string, description: string, date: Date) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.completed = false;
    }
}

class ReminderDatabase {
    private reminders: Map<string, Reminder> = new Map();

    createReminder(id: string, title: string, description: string, date: Date): void {
        if (this.reminders.has(id)) {
            throw new Error("Reminder with this ID already exists.");
        }
        this.reminders.set(id, new Reminder(id, title, description, date));
    }

    exists(id: string): boolean {
        return this.reminders.has(id);
    }

    markReminderAsCompleted(id: string): void {
        const reminder = this.reminders.get(id);
        if (!reminder) {
            throw new Error("Reminder with this ID does not exist.");
        }
        reminder.completed = true;
    }

    unmarkReminderAsCompleted(id: string): void {
        const reminder = this.reminders.get(id);
        if (!reminder) {
            throw new Error("Reminder with this ID does not exist.");
        }
        reminder.completed = false;
    }

    getAllReminders(): Reminder[] {
        return Array.from(this.reminders.values());
    }

    getReminder(id: string): Reminder | null {
        return this.reminders.get(id) || null;
    }

    getAllRemindersMarkedAsCompleted(): Reminder[] {
        return Array.from(this.reminders.values()).filter(reminder => reminder.completed);
    }

    getAllRemindersNotMarkedAsCompleted(): Reminder[] {
        return Array.from(this.reminders.values()).filter(reminder => !reminder.completed);
    }

    getAllRemindersDueByToday(): Reminder[] {
        const today = new Date();
        today.setHours(23, 59, 59, 999);
        return Array.from(this.reminders.values()).filter(reminder => reminder.date <= today);
    }

    updateReminder(id: string, title?: string, description?: string, date?: Date): void {
        const reminder = this.reminders.get(id);
        if (!reminder) {
            throw new Error("Reminder with this ID does not exist.");
        }
        if (title) reminder.title = title;
        if (description) reminder.description = description;
        if (date) reminder.date = date;
    }

    removeReminder(id: string): void {
        if (!this.reminders.has(id)) {
            throw new Error("Reminder with this ID does not exist.");
        }
        this.reminders.delete(id);
    }
}

// Example usage:
const reminderDB = new ReminderDatabase();
reminderDB.createReminder("1", "Meeting", "Team meeting at 10 AM", new Date("2025-03-11T10:00:00"));
console.log(reminderDB.getAllReminders());
console.log(reminderDB.getReminder("1"));
reminderDB.markReminderAsCompleted("1");
console.log(reminderDB.getAllRemindersMarkedAsCompleted());
reminderDB.unmarkReminderAsCompleted("1");
console.log(reminderDB.getAllRemindersNotMarkedAsCompleted());
reminderDB.removeReminder("1");
console.log(reminderDB.getAllReminders());