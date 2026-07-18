import { beforeEach, describe, expect, it } from 'vitest';
import { JobsService } from './jobs.service';

describe('JobsService', () => {
  let service: JobsService;

  beforeEach(() => {
    service = new JobsService();
  });

  it('loads seeded jobs by default', () => {
    const jobs = service.fetchJobs();
    expect(jobs.length).toBeGreaterThan(0);
    expect(jobs[0].title).toBeTruthy();
  });

  it('returns the seeded postings from the remote-style data source', () => {
    const jobs = service.fetchJobs();
    expect(jobs.some((job) => job.title === 'Frontend Engineer')).toBe(true);
    expect(jobs.some((job) => job.workMode === 'Hybrid')).toBe(true);
  });
});
