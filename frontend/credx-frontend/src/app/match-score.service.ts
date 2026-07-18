export interface StudentProfile {
  name: string;
  email: string;
  skills: string[];
  gpa: number;
  workAuthorization: string;
  sponsorshipNeeded: boolean;
}

export interface Listing {
  id: number;
  title: string;
  company: string;
  location: string;
  workMode: 'Remote' | 'Onsite' | 'Hybrid';
  sponsorshipRequired: boolean;
  requiredSkills: string[];
  gpaThreshold: number;
  visaSponsorship: boolean;
  description: string;
}

export interface MatchResult {
  score: number;
  reasons: string[];
}

export class MatchScoreService {
  score(profile: StudentProfile, listing: Listing): MatchResult {
    const reasons: string[] = [];
    const profileSkills = new Set(profile.skills.map((skill) => skill.toLowerCase()));
    const requiredSkills = listing.requiredSkills.map((skill) => skill.toLowerCase());
    const overlap = requiredSkills.filter((skill) => profileSkills.has(skill)).length;
    const overlapRatio = requiredSkills.length ? overlap / requiredSkills.length : 0;

    let score = Math.round(overlapRatio * 70);

    if (profile.gpa >= listing.gpaThreshold) {
      score += 20;
      reasons.push('GPA meets threshold');
    } else {
      reasons.push('GPA is below threshold');
    }

    if (overlap >= 2) {
      score += 10;
      reasons.push('Strong skill overlap');
    } else if (overlap === 1) {
      score += 5;
      reasons.push('Some skill overlap');
    } else {
      reasons.push('Limited skill overlap');
    }

    const authorizationMatches = this.authorizationMatches(profile, listing);
    if (authorizationMatches) {
      score += 5;
      reasons.push('Work authorization matches');
    } else {
      score -= 20;
      reasons.push('Sponsorship requirement may be a barrier');
    }

    const normalized = Math.max(0, Math.min(100, score));
    return {
      score: normalized,
      reasons
    };
  }

  private authorizationMatches(profile: StudentProfile, listing: Listing): boolean {
    if (!listing.visaSponsorship) {
      return true;
    }

    if (profile.sponsorshipNeeded) {
      return false;
    }

    return true;
  }
}
