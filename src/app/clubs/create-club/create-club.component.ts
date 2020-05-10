import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl , Validators} from '@angular/forms';
import { ClubsService } from '../clubs.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Club } from '../club.model';
import {mimeType} from './mime-type.validator';




@Component({
  selector: 'app-create-Club',
  templateUrl: './create-Club.component.html',
  styleUrls: ['./create-Club.component.css']
})
export class CreateClubComponent implements OnInit {
  club: Club;
  form:FormGroup;
  imagePreview: string;
  
  
  private mode ="create";
  

  private clubId :string;
  
  constructor(public ClubsService: ClubsService ,  public route: ActivatedRoute) { }

  onAddClub() {
    
    this.ClubsService.addClub(
      this.form.value.title,
      this.form.value.description,
      this.form.value.category,
      this.form.value.image
      );
    this.form.reset();
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null,{
        validators:[Validators.required, Validators.minLength(3)]
      }),
      category: new FormControl(null,{validators:[Validators.required]}),
      description: new FormControl(null,{validators:[Validators.required]}),
      image: new FormControl(null, {validators:[Validators.required],
         asyncValidators: [mimeType]})
    });
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('clubId')){
        this.mode = 'edit';
        this.clubId = paramMap.get('clubId');
        
        this.ClubsService.getClub(this.clubId).subscribe(clubData =>{
          
          this.club = {id: clubData._id, title:clubData.title, category:clubData.category, description:clubData.description,events:null,
            approved : null,imagePath:null};
            this.form.setValue({
              title:this.club.title,
              category:this.club.category,
              description:this.club.description
            })
        });
      } else {
        this.mode = "create";
        this.clubId = null;
      }
    });
  }
  onImagePicked(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview =reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  

}