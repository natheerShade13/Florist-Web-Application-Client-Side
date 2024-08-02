import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent implements OnInit {
  user = {
    name: '',
    email: '',
    profileImage: null as File | null
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Fetch user details from a service or local storage
    this.user = {
      name: 'Yuji Itadori',
      email: 'yuji.itadori@example.com',
      profileImage: null
    };
  }

  onSubmit() {
    // Handle form submission logic
    alert('Profile updated successfully!');
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.user.profileImage = file;
      // Optionally, handle file upload or preview
    }
  }

}
