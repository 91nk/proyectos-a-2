import{Component, OnInit}from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { ArtistService } from '../services/artist.service';
import { AlbumService } from '../services/album.service';
import { Artist } from '../models/artist';
import { Album } from '../models/album';

@Component({
  selector: 'album-add',
  templateUrl: '../views/album-add.html',
  styleUrls:['../../assets/styles/form.scss','../../assets/styles/buttons.scss','../app.component.scss'],
	providers: [UserService, ArtistService, AlbumService]
})

export class AlbumAddComponent implements OnInit{
  public titulo:string;
  public artist: Artist;
  public album: Album;
  public identity;
  public token;
  public url: string;
  public alertMessage;


  constructor(
    private _route: ActivatedRoute,
    private _router:Router,
    private _userService:UserService,
    private _artistService:ArtistService,
    private _albumService: AlbumService
  ){
    this.titulo ='Crear Nuevo Album';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.album = new Album('', '', 2003, '', '');
  }

  ngOnInit(){
    console.log('componente del album cargado');
  }

  onSubmit(){
    //saco de la url los parametros del id del artista para rellenar el valor artist del objeto Album.
    this._route.params.forEach((params:Params) =>{
      let artist_id = params['artist']
      this.album.artist = artist_id;

      this._albumService.addAlbum(this.token, this.album).subscribe(
        response=>{
        if(!response.album){
          this.alertMessage = 'Error en el servidor';
        }else{
          this.alertMessage='El album ha sido creado correrctamente';
          this.album = response.album;

          this._router.navigate(['/editar-album', response.album._id]);
        }
      }, error=>{
        var messageErr = <any>error;

        if(messageErr != null){
           var body = JSON.parse(error._body);
           this.alertMessage = body.message;

           console.log(error);
         }
      });
    });

  }
}
