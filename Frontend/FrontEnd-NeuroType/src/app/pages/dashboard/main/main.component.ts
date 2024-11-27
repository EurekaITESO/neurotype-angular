import { Component, OnInit } from '@angular/core';
import { Notes } from '../../../types/notes';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {

  notes: any; //en esta variable se van a quedar almacenadas todas las notas del usuario, es un arreglo de objetos, cada objeto es una nota y cada nota tiene dentro lo que esta en types/notes
  //A partir de esta variable es que vamos a mostrar toda la informacion

  constructor(private authService: AuthService, private userService :UserService){}

  ngOnInit(): void {

    this.userService.userNotes$.subscribe({
      next: (notes)=>{
        this.notes = notes;
      },error: (err)=>{
        console.error(err)
      }
    })
    
    this.userService.getUserNotes()
    console.log(this.notes)

  }
}
