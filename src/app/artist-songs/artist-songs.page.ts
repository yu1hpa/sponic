import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../spotify.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

interface CheckedBoxSong {
  song: string;
  isChecked: boolean;
}

@Component({
  selector: 'app-artist-songs',
  templateUrl: './artist-songs.page.html',
  styleUrls: ['./artist-songs.page.scss'],
})

export class ArtistSongsPage implements OnInit {
  checkedBoxSong: CheckedBoxSong[] = [{song: '', isChecked: false}];
  tracks: any[];
  constructor(
    private spotify: SpotifyService,
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const artistId = this.route.snapshot.paramMap.get('artistId');
    this.spotify.getArtistAlbumWithTracks(artistId).subscribe( data => {
      this.tracks = data;
      console.log(this.tracks);
      for(const {index, track} of this.tracks) {
        console.log(track);
        this.checkedBoxSong[index].song = track.song;
        console.log(this.checkedBoxSong[index].song);
      }
    });
  }

  clickBack() {
    this.navCtrl.navigateBack(['home']);
  }

}
