import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PokemonDetailsDialogComponent } from 'src/app/components/pokemon-details-dialog/pokemon-details-dialog.component';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  pokemons: Pokemon[] = [];
  totalPokemons: number = 0;
  pageSize: number = 20;
  currentPage: number = 0;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(public dialog: MatDialog, private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons(page: number = 0): void {
    this.pokemonService.getPokemonList(page * this.pageSize, this.pageSize)
      .subscribe(response => {
        this.pokemons = response.results.map((pokemonData: any): Pokemon => {
          const id = this.extractIdFromUrl(pokemonData.url);
          return {
            ...pokemonData,
            id
          };
        });
        this.totalPokemons = response.count;
      },
        error => {
          console.error('Hubo un error al obtener la lista de pokémons', error);
        });
  }

  private extractIdFromUrl(url: string): number {
    const urlParts = url.split('/');
    const idPart = urlParts[urlParts.length - 2];
    return parseInt(idPart, 10);
  }

  handlePageEvent(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.loadPokemons(this.currentPage);
  }

  openPokemonDetails(pokemonId: number): void {
    console.log("ID recibido para abrir detalles:", pokemonId);
    this.pokemonService.getPokemonDetail(pokemonId).subscribe(pokemonDetail => {
      this.dialog.open(PokemonDetailsDialogComponent, {
        width: '250px',
        data: { pokemon: pokemonDetail }
      });
    }, error => {
      console.error('Error al obtener detalles del pokémon:', error);
    });
  }
}
