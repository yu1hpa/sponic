import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../spotify.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artist-songs',
  templateUrl: './artist-songs.page.html',
  styleUrls: ['./artist-songs.page.scss'],
})
export class ArtistSongsPage implements OnInit {
  tracks: any[];
  constructor(
    private spotify: SpotifyService,
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) {}

  // Nullのときがあるが、この場合どう書けばいいのか。
  ngOnInit() {
    const artistId = this.route.snapshot.paramMap.get('artistId');
    this.spotify.getArtistAlbumWithTracks(artistId).subscribe( data => {
      this.tracks = data;
    });
  }

  clickBack() {
    this.navCtrl.navigateBack(['home']);
  }

}
