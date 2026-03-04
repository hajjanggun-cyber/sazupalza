import { BlogPost } from './types';

function addDays(dateString: string, days: number): string {
  const date = new Date(`${dateString}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function distributePublishedDates(
  posts: BlogPost[],
  startDate: string,
  spacingDays: number,
  updatedStartDate?: string,
  updatedSpacingDays = spacingDays,
): BlogPost[] {
  return posts.map((post, index) => ({
    ...(function () {
      const publishedAt = addDays(startDate, index * spacingDays);
      const scheduledUpdatedAt = updatedStartDate
        ? addDays(updatedStartDate, index * updatedSpacingDays)
        : undefined;

      return {
        ...post,
        // Keep editorial order stable while avoiding same-day bulk publish signals.
        publishedAt,
        updatedAt:
          post.updatedAt ??
          (scheduledUpdatedAt
            ? (scheduledUpdatedAt < publishedAt ? publishedAt : scheduledUpdatedAt)
            : undefined),
      };
    })(),
  }));
}
