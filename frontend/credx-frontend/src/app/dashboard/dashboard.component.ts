import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatchScoreService, Listing, StudentProfile } from '../match-score.service';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  profileForm: FormGroup;
  listings: Listing[] = [];
  filteredListings: Listing[] = [];
  selectedProfile?: StudentProfile;
  matchService = new MatchScoreService();
  jobsService = new JobsService();
  filters = {
    role: '',
    location: '',
    workMode: '',
    sponsorship: ''
  };

  readonly skillOptions = ['React', 'TypeScript', 'Node.js', 'Java', 'Spring', 'SQL', 'AWS', 'Python', 'UI/UX', 'Data Analysis'];
  readonly workAuthorizationOptions = ['US Citizen', 'Permanent Resident', 'F-1 OPT', 'H-1B', 'Other'];
  readonly workModes = ['Remote', 'Onsite', 'Hybrid'];

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      skills: [[], Validators.required],
      gpa: [3.5, [Validators.required, Validators.min(0), Validators.max(4)]],
      workAuthorization: ['F-1 OPT', Validators.required],
      sponsorshipNeeded: [false],
    });

  }

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.listings = this.jobsService.fetchJobs().map((job) => ({
      ...job,
      requiredSkills: [...job.requiredSkills]
    }));
    this.filteredListings = [...this.listings];
    if (this.selectedProfile) {
      this.applyFilters();
    }
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const profile: StudentProfile = {
      name: this.profileForm.value.name,
      email: this.profileForm.value.email,
      skills: this.profileForm.value.skills,
      gpa: Number(this.profileForm.value.gpa),
      workAuthorization: this.profileForm.value.workAuthorization,
      sponsorshipNeeded: this.profileForm.value.sponsorshipNeeded
    };

    this.selectedProfile = profile;
    this.applyFilters();
  }

  applyFilters(): void {
    if (!this.selectedProfile) {
      this.filteredListings = [...this.listings];
      return;
    }

    this.filteredListings = this.listings.filter((listing) => {
      const matchesRole = !this.filters.role || listing.title.toLowerCase().includes(this.filters.role.toLowerCase());
      const matchesLocation = !this.filters.location || listing.location.toLowerCase().includes(this.filters.location.toLowerCase());
      const matchesMode = !this.filters.workMode || listing.workMode === this.filters.workMode;
      const matchesSponsorship = this.filters.sponsorship === '' || (this.filters.sponsorship === 'required' ? listing.sponsorshipRequired : !listing.sponsorshipRequired);
      return matchesRole && matchesLocation && matchesMode && matchesSponsorship;
    }).map((listing) => ({ ...listing })).sort((a, b) => {
      const left = this.matchService.score(this.selectedProfile!, a).score;
      const right = this.matchService.score(this.selectedProfile!, b).score;
      return right - left;
    });
  }

  toggleSkill(skill: string): void {
    const skills = this.profileForm.get('skills')?.value || [];
    const updated = skills.includes(skill) ? skills.filter((item: string) => item !== skill) : [...skills, skill];
    this.profileForm.patchValue({ skills: updated });
  }

  getSelectedSkill(skill: string): boolean {
    return (this.profileForm.get('skills')?.value || []).includes(skill);
  }

  getMatchSummary(listing: Listing): string[] {
    if (!this.selectedProfile) {
      return [];
    }
    return this.matchService.score(this.selectedProfile, listing).reasons;
  }

  getMatchScore(listing: Listing): number {
    if (!this.selectedProfile) {
      return 0;
    }
    return this.matchService.score(this.selectedProfile, listing).score;
  }
}
