import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent {
  @Input() pokemon: any;
  @Output() pokemonClick = new EventEmitter<number>();

  onClick(): void {
    this.pokemonClick.emit(this.pokemon.id);
  }

}
