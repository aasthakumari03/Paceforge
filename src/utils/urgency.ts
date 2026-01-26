export function calculateUrgency(task: { deadline: Date; priority: string; isRollover: boolean }) {
    const now = new Date();
    const deadline = new Date(task.deadline);

    // Time difference in hours
    const diffInMs = deadline.getTime() - now.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);

    let score = 0;

    // 1. Time proximity
    if (diffInHours <= 0) {
        score += 100; // Overdue
    } else if (diffInHours <= 24) {
        score += 90; // Due today
    } else if (diffInHours <= 48) {
        score += 70; // Due tomorrow
    } else if (diffInHours <= 168) { // 1 week
        score += 40;
    } else {
        score += 10;
    }

    // 2. Priority
    switch (task.priority) {
        case 'high':
            score += 20;
            break;
        case 'medium':
            score += 10;
            break;
        case 'low':
            score += 0;
            break;
    }

    // 3. Rollover penalty (increases urgency)
    if (task.isRollover) {
        score += 15;
    }

    // Cap at 100 (unless overdue, which can go higher conceptually, but let's cap for UI consistency)
    return Math.min(Math.max(score, 0), 100);
}
