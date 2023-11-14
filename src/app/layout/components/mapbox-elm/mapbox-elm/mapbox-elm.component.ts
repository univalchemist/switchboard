import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { EnvService } from 'src/app/shared/services/env/env.service';
declare var MapboxSearchBox;

@Component({
  selector: 'app-mapbox-elm',
  templateUrl: './mapbox-elm.component.html',
  styleUrls: ['./mapbox-elm.component.scss']
})
export class MapboxElmComponent implements OnInit{
  currentLocation: GeolocationCoordinates | any= { latitude: 37.75, longitude: -122.41};
  @Output() pickedLocation: EventEmitter<any> = new EventEmitter(this.currentLocation)
  @Input() set toShowSearch(nextVal:any) {
    if(nextVal) {
      this.addSearchBox();
    } else {
      this.removeSearchBox();
    }
  };
  @Input() allowPickLocation:boolean;
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  locationMarker:any;
  searchBox:any; 

  constructor(
    private envService: EnvService
  ) {
    
  }

  ngOnInit(): void {
    mapboxgl.accessToken = this.envService.mapBoxToken;
    this.map = new mapboxgl.Map({
      container: 'map1',
      style: this.style,
      zoom: 18,
      center: [this.currentLocation.longitude, this.currentLocation.latitude],
    });

    this.map.on('click', (e) => {
      if(this.allowPickLocation) {
        if(this.locationMarker) { 
          this.locationMarker.remove();
        }
        setTimeout(() => {
          this.setLocation(e?.lngLat.lng, e?.lngLat.lat)
        }, 200);
      }
    }) 
    this.getCurrentLocation();
  }

  setLocation(lng, lat) {
    this.locationMarker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(this.map);
    this.pickedLocation.emit({ latitude: lng, longitude: lat});
  }

  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition((loc:GeolocationPosition) => {
      this.currentLocation = loc.coords;
      this.map.setCenter([this.currentLocation.longitude, this.currentLocation.latitude])
      this.locationMarker = new mapboxgl.Marker().setLngLat([this.currentLocation.longitude, this.currentLocation.latitude]).addTo(this.map);
    }, error => {
      
    })
  }

  addSearchBox() {
    this.searchBox = new MapboxSearchBox();
    this.searchBox.accessToken = this.envService.mapBoxToken;
    this.searchBox.marker = false;
    this.searchBox.mapboxgl = mapboxgl;
    console.log(this.searchBox)
    this.searchBox.addEventListener('retrieve', (event) => {
      let lngLat = event?.detail?.features[0]?.geometry?.coordinates;
      this.setLocation(lngLat[0],lngLat[1])
    });
    this.map.addControl(this.searchBox);
  }

  removeSearchBox() {
    if(this.searchBox)
      this.map.removeControl(this.searchBox);

  }

}
