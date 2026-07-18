import { describe, expect, it } from 'vitest';
import { MatchScoreService } from './match-score.service';

describe('MatchScoreService', () => {
  it('scores strong skill overlap and sponsorship compatibility highly', () => {
    const service = new MatchScoreService();
    const profile = {
      skills: ['React', 'TypeScript', 'Node.js'],
      gpa: 3.8,
      workAuthorization: 'US Citizen',
      sponsorshipNeeded: false
    };
    const listing = {
      title: 'Frontend Engineer',
      company: 'CredX',
      location: 'Remote',
      workMode: 'Remote',
      sponsorshipRequired: false,
      requiredSkills: ['React', 'TypeScript', 'SQL'],
      gpaThreshold: 3.5,
      visaSponsorship: false
    };

    const result = service.score(profile, listing);

    expect(result.score).toBeGreaterThan(80);
    expect(result.reasons).toContain('Strong skill overlap');
    expect(result.reasons).toContain('GPA meets threshold');
    expect(result.reasons).toContain('Work authorization matches');
  });

  it('penalizes missing sponsorship compatibility', () => {
    const service = new MatchScoreService();
    const profile = {
      skills: ['Java', 'Spring'],
      gpa: 3.2,
      workAuthorization: 'H-1B',
      sponsorshipNeeded: true
    };
    const listing = {
      title: 'Backend Engineer',
      company: 'CredX',
      location: 'New York',
      workMode: 'Onsite',
      sponsorshipRequired: true,
      requiredSkills: ['Java', 'Spring', 'AWS'],
      gpaThreshold: 3.0,
      visaSponsorship: true
    };

    const result = service.score(profile, listing);

    expect(result.score).toBeLessThan(70);
    expect(result.reasons).toContain('Sponsorship requirement may be a barrier');
  });
});
