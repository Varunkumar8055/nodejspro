class Reminder {
    id: string;
    title: string;
    description: string;
    date: Date;

    constructor(id: string, title: string, description: string, date: Date) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
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

    getAllReminders(): Reminder[] {
        return Array.from(this.reminders.values());
    }

    getReminder(id: string): Reminder | null {
        return this.reminders.get(id) || null;
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
reminderDB.removeReminder("1");
console.log(reminderDB.getAllReminders());