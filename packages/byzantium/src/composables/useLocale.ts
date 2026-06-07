import { ref, computed } from 'vue'

export type LocaleKey =
  | 'nl' | 'en' | 'de' | 'fr' | 'es' | 'it' | 'pt'
  | 'pl' | 'ro' | 'hu' | 'cs' | 'sk' | 'hr' | 'sl'
  | 'sv' | 'da' | 'fi' | 'no' | 'el' | 'bg' | 'lt'
  | 'lv' | 'et'

export interface ByzLocale {
  close:          string
  loading:        string
  remove:         string
  search:         string
  noResults:      string
  previous:       string
  next:           string
  breadcrumbNav:  string
  required:       string
  dropFiles:      string
  browseFiles:    string
  commandPalette: string
  today:          string
  clear:          string
  confirm:        string
  cancel:         string
  sortAsc:        string
  sortDesc:       string
  noData:         string
  rowsPerPage:    string
  step:           string
  of:             string
  closeDrawer:    string
  hue:            string
  saturation:     string
  lightness:      string
  hex:            string
  bold:           string
  italic:         string
  underline:      string
  strikethrough:  string
  link:           string
  unlink:         string
  orderedList:    string
  unorderedList:  string
  undo:           string
  redo:           string
}

type LocaleDef = ByzLocale

const nl: LocaleDef = {
  close: 'Sluiten', loading: 'Laden…', remove: 'Verwijder', search: 'Zoeken…',
  noResults: 'Geen resultaten', previous: 'Vorige', next: 'Volgende',
  breadcrumbNav: 'Broodkruimel', required: 'Verplicht',
  dropFiles: 'Sleep bestanden hierheen', browseFiles: 'Bladeren',
  commandPalette: 'Typ een commando of zoek…', today: 'Vandaag',
  clear: 'Wissen', confirm: 'Bevestigen', cancel: 'Annuleren',
  sortAsc: 'Oplopend sorteren', sortDesc: 'Aflopend sorteren',
  noData: 'Geen gegevens', rowsPerPage: 'Rijen per pagina',
  step: 'Stap', of: 'van', closeDrawer: 'Zijpaneel sluiten',
  hue: 'Tint', saturation: 'Verzadiging', lightness: 'Helderheid', hex: 'Hex-waarde',
  bold: 'Vet', italic: 'Cursief', underline: 'Onderstrepen', strikethrough: 'Doorstrepen',
  link: 'Link invoegen', unlink: 'Link verwijderen',
  orderedList: 'Genummerde lijst', unorderedList: 'Opsomming',
  undo: 'Ongedaan maken', redo: 'Opnieuw',
}

const en: LocaleDef = {
  close: 'Close', loading: 'Loading…', remove: 'Remove', search: 'Search…',
  noResults: 'No results', previous: 'Previous', next: 'Next',
  breadcrumbNav: 'Breadcrumb', required: 'Required',
  dropFiles: 'Drop files here', browseFiles: 'Browse',
  commandPalette: 'Type a command or search…', today: 'Today',
  clear: 'Clear', confirm: 'Confirm', cancel: 'Cancel',
  sortAsc: 'Sort ascending', sortDesc: 'Sort descending',
  noData: 'No data', rowsPerPage: 'Rows per page',
  step: 'Step', of: 'of', closeDrawer: 'Close panel',
  hue: 'Hue', saturation: 'Saturation', lightness: 'Lightness', hex: 'Hex value',
  bold: 'Bold', italic: 'Italic', underline: 'Underline', strikethrough: 'Strikethrough',
  link: 'Insert link', unlink: 'Remove link',
  orderedList: 'Ordered list', unorderedList: 'Unordered list',
  undo: 'Undo', redo: 'Redo',
}

const de: LocaleDef = {
  close: 'Schließen', loading: 'Laden…', remove: 'Entfernen', search: 'Suchen…',
  noResults: 'Keine Ergebnisse', previous: 'Zurück', next: 'Weiter',
  breadcrumbNav: 'Brotkrumen', required: 'Pflichtfeld',
  dropFiles: 'Dateien hier ablegen', browseFiles: 'Durchsuchen',
  commandPalette: 'Befehl oder Suche eingeben…', today: 'Heute',
  clear: 'Leeren', confirm: 'Bestätigen', cancel: 'Abbrechen',
  sortAsc: 'Aufsteigend sortieren', sortDesc: 'Absteigend sortieren',
  noData: 'Keine Daten', rowsPerPage: 'Zeilen pro Seite',
  step: 'Schritt', of: 'von', closeDrawer: 'Seitenleiste schließen',
  hue: 'Farbton', saturation: 'Sättigung', lightness: 'Helligkeit', hex: 'Hex-Wert',
  bold: 'Fett', italic: 'Kursiv', underline: 'Unterstreichen', strikethrough: 'Durchstreichen',
  link: 'Link einfügen', unlink: 'Link entfernen',
  orderedList: 'Nummerierte Liste', unorderedList: 'Aufzählung',
  undo: 'Rückgängig', redo: 'Wiederholen',
}

const fr: LocaleDef = {
  close: 'Fermer', loading: 'Chargement…', remove: 'Supprimer', search: 'Rechercher…',
  noResults: 'Aucun résultat', previous: 'Précédent', next: 'Suivant',
  breadcrumbNav: "Fil d'Ariane", required: 'Obligatoire',
  dropFiles: 'Déposez les fichiers ici', browseFiles: 'Parcourir',
  commandPalette: 'Tapez une commande ou recherchez…', today: "Aujourd'hui",
  clear: 'Effacer', confirm: 'Confirmer', cancel: 'Annuler',
  sortAsc: 'Trier croissant', sortDesc: 'Trier décroissant',
  noData: 'Aucune donnée', rowsPerPage: 'Lignes par page',
  step: 'Étape', of: 'sur', closeDrawer: 'Fermer le panneau',
  hue: 'Teinte', saturation: 'Saturation', lightness: 'Luminosité', hex: 'Valeur hex',
  bold: 'Gras', italic: 'Italique', underline: 'Souligner', strikethrough: 'Barrer',
  link: 'Insérer un lien', unlink: 'Supprimer le lien',
  orderedList: 'Liste numérotée', unorderedList: 'Liste à puces',
  undo: 'Annuler', redo: 'Rétablir',
}

const es: LocaleDef = {
  close: 'Cerrar', loading: 'Cargando…', remove: 'Eliminar', search: 'Buscar…',
  noResults: 'Sin resultados', previous: 'Anterior', next: 'Siguiente',
  breadcrumbNav: 'Ruta de navegación', required: 'Obligatorio',
  dropFiles: 'Suelta archivos aquí', browseFiles: 'Explorar',
  commandPalette: 'Escribe un comando o busca…', today: 'Hoy',
  clear: 'Limpiar', confirm: 'Confirmar', cancel: 'Cancelar',
  sortAsc: 'Orden ascendente', sortDesc: 'Orden descendente',
  noData: 'Sin datos', rowsPerPage: 'Filas por página',
  step: 'Paso', of: 'de', closeDrawer: 'Cerrar panel',
  hue: 'Tono', saturation: 'Saturación', lightness: 'Luminosidad', hex: 'Valor hex',
  bold: 'Negrita', italic: 'Cursiva', underline: 'Subrayar', strikethrough: 'Tachar',
  link: 'Insertar enlace', unlink: 'Quitar enlace',
  orderedList: 'Lista ordenada', unorderedList: 'Lista sin orden',
  undo: 'Deshacer', redo: 'Rehacer',
}

const it: LocaleDef = {
  close: 'Chiudi', loading: 'Caricamento…', remove: 'Rimuovi', search: 'Cerca…',
  noResults: 'Nessun risultato', previous: 'Precedente', next: 'Successivo',
  breadcrumbNav: 'Percorso di navigazione', required: 'Obbligatorio',
  dropFiles: 'Trascina i file qui', browseFiles: 'Sfoglia',
  commandPalette: 'Digita un comando o cerca…', today: 'Oggi',
  clear: 'Cancella', confirm: 'Conferma', cancel: 'Annulla',
  sortAsc: 'Ordine crescente', sortDesc: 'Ordine decrescente',
  noData: 'Nessun dato', rowsPerPage: 'Righe per pagina',
  step: 'Passaggio', of: 'di', closeDrawer: 'Chiudi pannello',
  hue: 'Tonalità', saturation: 'Saturazione', lightness: 'Luminosità', hex: 'Valore hex',
  bold: 'Grassetto', italic: 'Corsivo', underline: 'Sottolinea', strikethrough: 'Barrato',
  link: 'Inserisci link', unlink: 'Rimuovi link',
  orderedList: 'Elenco ordinato', unorderedList: 'Elenco puntato',
  undo: 'Annulla', redo: 'Ripeti',
}

const pt: LocaleDef = {
  close: 'Fechar', loading: 'A carregar…', remove: 'Remover', search: 'Pesquisar…',
  noResults: 'Sem resultados', previous: 'Anterior', next: 'Seguinte',
  breadcrumbNav: 'Caminho de navegação', required: 'Obrigatório',
  dropFiles: 'Solte os ficheiros aqui', browseFiles: 'Procurar',
  commandPalette: 'Escreva um comando ou pesquise…', today: 'Hoje',
  clear: 'Limpar', confirm: 'Confirmar', cancel: 'Cancelar',
  sortAsc: 'Ordem crescente', sortDesc: 'Ordem decrescente',
  noData: 'Sem dados', rowsPerPage: 'Linhas por página',
  step: 'Passo', of: 'de', closeDrawer: 'Fechar painel',
  hue: 'Matiz', saturation: 'Saturação', lightness: 'Luminosidade', hex: 'Valor hex',
  bold: 'Negrito', italic: 'Itálico', underline: 'Sublinhar', strikethrough: 'Rasurar',
  link: 'Inserir link', unlink: 'Remover link',
  orderedList: 'Lista ordenada', unorderedList: 'Lista não ordenada',
  undo: 'Desfazer', redo: 'Refazer',
}

const pl: LocaleDef = {
  close: 'Zamknij', loading: 'Ładowanie…', remove: 'Usuń', search: 'Szukaj…',
  noResults: 'Brak wyników', previous: 'Poprzedni', next: 'Następny',
  breadcrumbNav: 'Ścieżka nawigacji', required: 'Wymagane',
  dropFiles: 'Upuść pliki tutaj', browseFiles: 'Przeglądaj',
  commandPalette: 'Wpisz polecenie lub wyszukaj…', today: 'Dziś',
  clear: 'Wyczyść', confirm: 'Potwierdź', cancel: 'Anuluj',
  sortAsc: 'Sortuj rosnąco', sortDesc: 'Sortuj malejąco',
  noData: 'Brak danych', rowsPerPage: 'Wierszy na stronę',
  step: 'Krok', of: 'z', closeDrawer: 'Zamknij panel',
  hue: 'Odcień', saturation: 'Nasycenie', lightness: 'Jasność', hex: 'Wartość hex',
  bold: 'Pogrubienie', italic: 'Kursywa', underline: 'Podkreślenie', strikethrough: 'Przekreślenie',
  link: 'Wstaw link', unlink: 'Usuń link',
  orderedList: 'Lista numerowana', unorderedList: 'Lista punktowana',
  undo: 'Cofnij', redo: 'Ponów',
}

const ro: LocaleDef = {
  close: 'Închide', loading: 'Se încarcă…', remove: 'Elimină', search: 'Caută…',
  noResults: 'Niciun rezultat', previous: 'Anterior', next: 'Următor',
  breadcrumbNav: 'Fir de navigare', required: 'Obligatoriu',
  dropFiles: 'Plasează fișierele aici', browseFiles: 'Răsfoire',
  commandPalette: 'Tastați o comandă sau căutați…', today: 'Azi',
  clear: 'Șterge', confirm: 'Confirmă', cancel: 'Anulează',
  sortAsc: 'Sortare crescătoare', sortDesc: 'Sortare descrescătoare',
  noData: 'Fără date', rowsPerPage: 'Rânduri pe pagină',
  step: 'Pas', of: 'din', closeDrawer: 'Închide panoul',
  hue: 'Nuanță', saturation: 'Saturație', lightness: 'Luminozitate', hex: 'Valoare hex',
  bold: 'Îngroșat', italic: 'Cursiv', underline: 'Subliniat', strikethrough: 'Tăiat',
  link: 'Inserează link', unlink: 'Elimină link',
  orderedList: 'Listă ordonată', unorderedList: 'Listă neordonată',
  undo: 'Anulează', redo: 'Refă',
}

const hu: LocaleDef = {
  close: 'Bezárás', loading: 'Betöltés…', remove: 'Eltávolítás', search: 'Keresés…',
  noResults: 'Nincs eredmény', previous: 'Előző', next: 'Következő',
  breadcrumbNav: 'Navigációs útvonal', required: 'Kötelező',
  dropFiles: 'Húzza ide a fájlokat', browseFiles: 'Tallózás',
  commandPalette: 'Írjon be egy parancsot vagy keressen…', today: 'Ma',
  clear: 'Törlés', confirm: 'Megerősítés', cancel: 'Mégse',
  sortAsc: 'Növekvő sorrendbe', sortDesc: 'Csökkenő sorrendbe',
  noData: 'Nincs adat', rowsPerPage: 'Sor oldalanként',
  step: 'Lépés', of: '/', closeDrawer: 'Panel bezárása',
  hue: 'Színárnyalat', saturation: 'Telítettség', lightness: 'Világosság', hex: 'Hex-érték',
  bold: 'Félkövér', italic: 'Dőlt', underline: 'Aláhúzás', strikethrough: 'Áthúzás',
  link: 'Hivatkozás beszúrása', unlink: 'Hivatkozás eltávolítása',
  orderedList: 'Számozott lista', unorderedList: 'Felsorolás',
  undo: 'Visszavonás', redo: 'Újra',
}

const cs: LocaleDef = {
  close: 'Zavřít', loading: 'Načítání…', remove: 'Odebrat', search: 'Hledat…',
  noResults: 'Žádné výsledky', previous: 'Předchozí', next: 'Další',
  breadcrumbNav: 'Navigační cesta', required: 'Povinné',
  dropFiles: 'Přetáhněte soubory sem', browseFiles: 'Procházet',
  commandPalette: 'Zadejte příkaz nebo hledejte…', today: 'Dnes',
  clear: 'Vymazat', confirm: 'Potvrdit', cancel: 'Zrušit',
  sortAsc: 'Seřadit vzestupně', sortDesc: 'Seřadit sestupně',
  noData: 'Žádná data', rowsPerPage: 'Řádků na stránku',
  step: 'Krok', of: 'z', closeDrawer: 'Zavřít panel',
  hue: 'Odstín', saturation: 'Sytost', lightness: 'Světlost', hex: 'Hex hodnota',
  bold: 'Tučné', italic: 'Kurzíva', underline: 'Podtržení', strikethrough: 'Přeškrtnutí',
  link: 'Vložit odkaz', unlink: 'Odebrat odkaz',
  orderedList: 'Číslovaný seznam', unorderedList: 'Odrážkový seznam',
  undo: 'Zpět', redo: 'Znovu',
}

const sk: LocaleDef = {
  close: 'Zavrieť', loading: 'Načítava sa…', remove: 'Odstrániť', search: 'Hľadať…',
  noResults: 'Žiadne výsledky', previous: 'Predchádzajúci', next: 'Ďalší',
  breadcrumbNav: 'Navigačná cesta', required: 'Povinné',
  dropFiles: 'Presuňte súbory sem', browseFiles: 'Prehľadávať',
  commandPalette: 'Zadajte príkaz alebo hľadajte…', today: 'Dnes',
  clear: 'Vymazať', confirm: 'Potvrdiť', cancel: 'Zrušiť',
  sortAsc: 'Zoradiť vzostupne', sortDesc: 'Zoradiť zostupne',
  noData: 'Žiadne dáta', rowsPerPage: 'Riadkov na stránku',
  step: 'Krok', of: 'z', closeDrawer: 'Zavrieť panel',
  hue: 'Odtieň', saturation: 'Sýtosť', lightness: 'Svetlosť', hex: 'Hex hodnota',
  bold: 'Tučné', italic: 'Kurzíva', underline: 'Podčiarknutie', strikethrough: 'Prečiarknutie',
  link: 'Vložiť odkaz', unlink: 'Odstrániť odkaz',
  orderedList: 'Číslovaný zoznam', unorderedList: 'Zoznam s odrážkami',
  undo: 'Späť', redo: 'Znova',
}

const hr: LocaleDef = {
  close: 'Zatvori', loading: 'Učitavanje…', remove: 'Ukloni', search: 'Pretraži…',
  noResults: 'Nema rezultata', previous: 'Prethodno', next: 'Sljedeće',
  breadcrumbNav: 'Navigacijska staza', required: 'Obavezno',
  dropFiles: 'Povucite datoteke ovdje', browseFiles: 'Pregledaj',
  commandPalette: 'Unesite naredbu ili pretražite…', today: 'Danas',
  clear: 'Obriši', confirm: 'Potvrdi', cancel: 'Odustani',
  sortAsc: 'Sortiraj uzlazno', sortDesc: 'Sortiraj silazno',
  noData: 'Nema podataka', rowsPerPage: 'Redova po stranici',
  step: 'Korak', of: 'od', closeDrawer: 'Zatvori ploču',
  hue: 'Nijansa', saturation: 'Zasićenost', lightness: 'Svjetlina', hex: 'Hex vrijednost',
  bold: 'Podebljano', italic: 'Kurziv', underline: 'Podvučeno', strikethrough: 'Prekriženo',
  link: 'Umetni vezu', unlink: 'Ukloni vezu',
  orderedList: 'Numerirana lista', unorderedList: 'Lista s oznakama',
  undo: 'Poništi', redo: 'Ponovi',
}

const sl: LocaleDef = {
  close: 'Zapri', loading: 'Nalaganje…', remove: 'Odstrani', search: 'Iskanje…',
  noResults: 'Ni rezultatov', previous: 'Prejšnji', next: 'Naslednji',
  breadcrumbNav: 'Navigacijska pot', required: 'Obvezno',
  dropFiles: 'Povlecite datoteke sem', browseFiles: 'Brskaj',
  commandPalette: 'Vnesite ukaz ali iščite…', today: 'Danes',
  clear: 'Počisti', confirm: 'Potrdi', cancel: 'Prekliči',
  sortAsc: 'Razvrsti naraščajoče', sortDesc: 'Razvrsti padajoče',
  noData: 'Ni podatkov', rowsPerPage: 'Vrstic na stran',
  step: 'Korak', of: 'od', closeDrawer: 'Zapri ploščo',
  hue: 'Odtenek', saturation: 'Nasičenost', lightness: 'Svetlost', hex: 'Hex vrednost',
  bold: 'Krepko', italic: 'Ležeče', underline: 'Podčrtano', strikethrough: 'Prečrtano',
  link: 'Vstavi povezavo', unlink: 'Odstrani povezavo',
  orderedList: 'Urejen seznam', unorderedList: 'Neurejen seznam',
  undo: 'Razveljavi', redo: 'Ponovi',
}

const sv: LocaleDef = {
  close: 'Stäng', loading: 'Laddar…', remove: 'Ta bort', search: 'Sök…',
  noResults: 'Inga resultat', previous: 'Föregående', next: 'Nästa',
  breadcrumbNav: 'Brödsmulor', required: 'Obligatoriskt',
  dropFiles: 'Släpp filer här', browseFiles: 'Bläddra',
  commandPalette: 'Skriv ett kommando eller sök…', today: 'Idag',
  clear: 'Rensa', confirm: 'Bekräfta', cancel: 'Avbryt',
  sortAsc: 'Sortera stigande', sortDesc: 'Sortera fallande',
  noData: 'Ingen data', rowsPerPage: 'Rader per sida',
  step: 'Steg', of: 'av', closeDrawer: 'Stäng panel',
  hue: 'Nyans', saturation: 'Mättnad', lightness: 'Ljusstyrka', hex: 'Hex-värde',
  bold: 'Fet', italic: 'Kursiv', underline: 'Understruken', strikethrough: 'Genomstruken',
  link: 'Infoga länk', unlink: 'Ta bort länk',
  orderedList: 'Ordnad lista', unorderedList: 'Oordnad lista',
  undo: 'Ångra', redo: 'Gör om',
}

const da: LocaleDef = {
  close: 'Luk', loading: 'Indlæser…', remove: 'Fjern', search: 'Søg…',
  noResults: 'Ingen resultater', previous: 'Forrige', next: 'Næste',
  breadcrumbNav: 'Brødkrummer', required: 'Påkrævet',
  dropFiles: 'Slip filer her', browseFiles: 'Gennemse',
  commandPalette: 'Skriv en kommando eller søg…', today: 'I dag',
  clear: 'Ryd', confirm: 'Bekræft', cancel: 'Annuller',
  sortAsc: 'Sorter stigende', sortDesc: 'Sorter faldende',
  noData: 'Ingen data', rowsPerPage: 'Rækker pr. side',
  step: 'Trin', of: 'af', closeDrawer: 'Luk panel',
  hue: 'Farvetone', saturation: 'Mætning', lightness: 'Lysstyrke', hex: 'Hex-værdi',
  bold: 'Fed', italic: 'Kursiv', underline: 'Understreget', strikethrough: 'Gennemstreget',
  link: 'Indsæt link', unlink: 'Fjern link',
  orderedList: 'Ordnet liste', unorderedList: 'Uordnet liste',
  undo: 'Fortryd', redo: 'Gentag',
}

const fi: LocaleDef = {
  close: 'Sulje', loading: 'Ladataan…', remove: 'Poista', search: 'Etsi…',
  noResults: 'Ei tuloksia', previous: 'Edellinen', next: 'Seuraava',
  breadcrumbNav: 'Navigointipolku', required: 'Pakollinen',
  dropFiles: 'Pudota tiedostot tähän', browseFiles: 'Selaa',
  commandPalette: 'Kirjoita komento tai etsi…', today: 'Tänään',
  clear: 'Tyhjennä', confirm: 'Vahvista', cancel: 'Peruuta',
  sortAsc: 'Lajittele nousevasti', sortDesc: 'Lajittele laskevasti',
  noData: 'Ei dataa', rowsPerPage: 'Rivejä sivulla',
  step: 'Vaihe', of: '/', closeDrawer: 'Sulje paneeli',
  hue: 'Sävy', saturation: 'Kylläisyys', lightness: 'Kirkkaus', hex: 'Hex-arvo',
  bold: 'Lihavoitu', italic: 'Kursiivi', underline: 'Alleviivaus', strikethrough: 'Yliviivaus',
  link: 'Lisää linkki', unlink: 'Poista linkki',
  orderedList: 'Numeroitu lista', unorderedList: 'Luettelomerkkilista',
  undo: 'Kumoa', redo: 'Tee uudelleen',
}

const no: LocaleDef = {
  close: 'Lukk', loading: 'Laster…', remove: 'Fjern', search: 'Søk…',
  noResults: 'Ingen resultater', previous: 'Forrige', next: 'Neste',
  breadcrumbNav: 'Brødsmulesti', required: 'Påkrevd',
  dropFiles: 'Slipp filer her', browseFiles: 'Bla gjennom',
  commandPalette: 'Skriv en kommando eller søk…', today: 'I dag',
  clear: 'Tøm', confirm: 'Bekreft', cancel: 'Avbryt',
  sortAsc: 'Sorter stigende', sortDesc: 'Sorter synkende',
  noData: 'Ingen data', rowsPerPage: 'Rader per side',
  step: 'Steg', of: 'av', closeDrawer: 'Lukk panel',
  hue: 'Fargetone', saturation: 'Metning', lightness: 'Lysstyrke', hex: 'Hex-verdi',
  bold: 'Fet', italic: 'Kursiv', underline: 'Understreket', strikethrough: 'Gjennomstreket',
  link: 'Sett inn lenke', unlink: 'Fjern lenke',
  orderedList: 'Ordnet liste', unorderedList: 'Uordnet liste',
  undo: 'Angre', redo: 'Gjenta',
}

const el: LocaleDef = {
  close: 'Κλείσιμο', loading: 'Φόρτωση…', remove: 'Αφαίρεση', search: 'Αναζήτηση…',
  noResults: 'Δεν βρέθηκαν αποτελέσματα', previous: 'Προηγούμενο', next: 'Επόμενο',
  breadcrumbNav: 'Ιχνηλάτηση', required: 'Υποχρεωτικό',
  dropFiles: 'Σύρτε αρχεία εδώ', browseFiles: 'Αναζήτηση',
  commandPalette: 'Πληκτρολογήστε εντολή ή αναζητήστε…', today: 'Σήμερα',
  clear: 'Εκκαθάριση', confirm: 'Επιβεβαίωση', cancel: 'Ακύρωση',
  sortAsc: 'Ταξινόμηση αύξουσα', sortDesc: 'Ταξινόμηση φθίνουσα',
  noData: 'Δεν υπάρχουν δεδομένα', rowsPerPage: 'Γραμμές ανά σελίδα',
  step: 'Βήμα', of: 'από', closeDrawer: 'Κλείσιμο πλαισίου',
  hue: 'Απόχρωση', saturation: 'Κορεσμός', lightness: 'Φωτεινότητα', hex: 'Τιμή hex',
  bold: 'Έντονα', italic: 'Πλάγια', underline: 'Υπογράμμιση', strikethrough: 'Διαγραφή',
  link: 'Εισαγωγή συνδέσμου', unlink: 'Αφαίρεση συνδέσμου',
  orderedList: 'Αριθμημένη λίστα', unorderedList: 'Λίστα με κουκκίδες',
  undo: 'Αναίρεση', redo: 'Επανάληψη',
}

const bg: LocaleDef = {
  close: 'Затвори', loading: 'Зареждане…', remove: 'Премахни', search: 'Търсене…',
  noResults: 'Няма резултати', previous: 'Предишен', next: 'Следващ',
  breadcrumbNav: 'Навигационна пътека', required: 'Задължително',
  dropFiles: 'Пуснете файловете тук', browseFiles: 'Преглед',
  commandPalette: 'Въведете команда или търсете…', today: 'Днес',
  clear: 'Изчисти', confirm: 'Потвърди', cancel: 'Отказ',
  sortAsc: 'Сортиране възходящо', sortDesc: 'Сортиране низходящо',
  noData: 'Няма данни', rowsPerPage: 'Редове на страница',
  step: 'Стъпка', of: 'от', closeDrawer: 'Затвори панела',
  hue: 'Нюанс', saturation: 'Наситеност', lightness: 'Яркост', hex: 'Hex стойност',
  bold: 'Удебелен', italic: 'Курсив', underline: 'Подчертан', strikethrough: 'Зачеркнат',
  link: 'Вмъкни връзка', unlink: 'Премахни връзка',
  orderedList: 'Номериран списък', unorderedList: 'Списък с точки',
  undo: 'Отмяна', redo: 'Повтори',
}

const lt: LocaleDef = {
  close: 'Uždaryti', loading: 'Kraunama…', remove: 'Pašalinti', search: 'Ieškoti…',
  noResults: 'Rezultatų nėra', previous: 'Ankstesnis', next: 'Kitas',
  breadcrumbNav: 'Naršymo takas', required: 'Privaloma',
  dropFiles: 'Vilkite failus čia', browseFiles: 'Naršyti',
  commandPalette: 'Įveskite komandą arba ieškokite…', today: 'Šiandien',
  clear: 'Išvalyti', confirm: 'Patvirtinti', cancel: 'Atšaukti',
  sortAsc: 'Rūšiuoti didėjančiai', sortDesc: 'Rūšiuoti mažėjančiai',
  noData: 'Nėra duomenų', rowsPerPage: 'Eilučių puslapyje',
  step: 'Žingsnis', of: 'iš', closeDrawer: 'Uždaryti skydelį',
  hue: 'Atspalvis', saturation: 'Sodrumas', lightness: 'Šviesumas', hex: 'Hex reikšmė',
  bold: 'Paryškintas', italic: 'Kursyvas', underline: 'Pabrauktas', strikethrough: 'Perbrauktas',
  link: 'Įterpti nuorodą', unlink: 'Šalinti nuorodą',
  orderedList: 'Sunumeruotas sąrašas', unorderedList: 'Ženklintas sąrašas',
  undo: 'Atšaukti', redo: 'Grąžinti',
}

const lv: LocaleDef = {
  close: 'Aizvērt', loading: 'Ielādē…', remove: 'Noņemt', search: 'Meklēt…',
  noResults: 'Nav rezultātu', previous: 'Iepriekšējais', next: 'Nākamais',
  breadcrumbNav: 'Navigācijas taka', required: 'Obligāts',
  dropFiles: 'Nometiet failus šeit', browseFiles: 'Pārlūkot',
  commandPalette: 'Ievadiet komandu vai meklējiet…', today: 'Šodien',
  clear: 'Notīrīt', confirm: 'Apstiprināt', cancel: 'Atcelt',
  sortAsc: 'Kārtot augoši', sortDesc: 'Kārtot dilstoši',
  noData: 'Nav datu', rowsPerPage: 'Rindas lapā',
  step: 'Solis', of: 'no', closeDrawer: 'Aizvērt paneli',
  hue: 'Nokrāsa', saturation: 'Piesātinājums', lightness: 'Spilgtums', hex: 'Hex vērtība',
  bold: 'Treknraksts', italic: 'Slīpraksts', underline: 'Pasvītrojums', strikethrough: 'Pārsvītrojums',
  link: 'Ievietot saiti', unlink: 'Noņemt saiti',
  orderedList: 'Numerēts saraksts', unorderedList: 'Aizzīmju saraksts',
  undo: 'Atsaukt', redo: 'Atkārtot',
}

const et: LocaleDef = {
  close: 'Sulge', loading: 'Laadimine…', remove: 'Eemalda', search: 'Otsi…',
  noResults: 'Tulemusi ei leitud', previous: 'Eelmine', next: 'Järgmine',
  breadcrumbNav: 'Navigatsiooniraja', required: 'Kohustuslik',
  dropFiles: 'Lohista failid siia', browseFiles: 'Sirvi',
  commandPalette: 'Sisesta käsk või otsi…', today: 'Täna',
  clear: 'Tühjenda', confirm: 'Kinnita', cancel: 'Tühista',
  sortAsc: 'Sorteeri kasvavalt', sortDesc: 'Sorteeri kahanevalt',
  noData: 'Andmed puuduvad', rowsPerPage: 'Ridu lehel',
  step: 'Samm', of: '/', closeDrawer: 'Sulge paneel',
  hue: 'Toon', saturation: 'Küllastus', lightness: 'Heledus', hex: 'Hex-väärtus',
  bold: 'Paks', italic: 'Kursiiv', underline: 'Allajoonimine', strikethrough: 'Läbikriipsutamine',
  link: 'Lisa link', unlink: 'Eemalda link',
  orderedList: 'Nummerdatud loend', unorderedList: 'Täpploend',
  undo: 'Võta tagasi', redo: 'Tee uuesti',
}

// ── Public exports ───────────────────────────────────────────────────────────

export const defaultLocale  = nl
export const englishLocale  = en
export const germanLocale   = de
export const frenchLocale   = fr
export const spanishLocale  = es
export const italianLocale  = it
export const portugueseLocale = pt

const locales: Record<LocaleKey, ByzLocale> = {
  nl, en, de, fr, es, it, pt,
  pl, ro, hu, cs, sk, hr, sl,
  sv, da, fi, no, el, bg, lt, lv, et,
}

export const localeLabels: Record<LocaleKey, string> = {
  nl: 'NL', en: 'EN', de: 'DE', fr: 'FR', es: 'ES', it: 'IT', pt: 'PT',
  pl: 'PL', ro: 'RO', hu: 'HU', cs: 'CS', sk: 'SK', hr: 'HR', sl: 'SL',
  sv: 'SV', da: 'DA', fi: 'FI', no: 'NO', el: 'EL', bg: 'BG', lt: 'LT',
  lv: 'LV', et: 'ET',
}

export const localeNames: Record<LocaleKey, string> = {
  nl: 'Nederlands', en: 'English',    de: 'Deutsch',     fr: 'Français',
  es: 'Español',    it: 'Italiano',   pt: 'Português',   pl: 'Polski',
  ro: 'Română',     hu: 'Magyar',     cs: 'Čeština',     sk: 'Slovenčina',
  hr: 'Hrvatski',   sl: 'Slovenščina', sv: 'Svenska',    da: 'Dansk',
  fi: 'Suomi',      no: 'Norsk',      el: 'Ελληνικά',   bg: 'Български',
  lt: 'Lietuvių',   lv: 'Latviešu',   et: 'Eesti',
}

const LOCALE_INTL_MAP: Record<LocaleKey, string> = {
  nl: 'nl-NL', en: 'en-GB', de: 'de-DE', fr: 'fr-FR', es: 'es-ES', it: 'it-IT', pt: 'pt-PT',
  pl: 'pl-PL', ro: 'ro-RO', hu: 'hu-HU', cs: 'cs-CZ', sk: 'sk-SK', hr: 'hr-HR', sl: 'sl-SI',
  sv: 'sv-SE', da: 'da-DK', fi: 'fi-FI', no: 'nb-NO', el: 'el-GR', bg: 'bg-BG', lt: 'lt-LT',
  lv: 'lv-LV', et: 'et-EE',
}

// ── Composable ───────────────────────────────────────────────────────────────

const activeKey = ref<LocaleKey>('nl')
const locale    = ref<ByzLocale>({ ...nl })

export function useLocale() {
  const currentKey = computed(() => activeKey.value)
  const intlLocale = computed(() => LOCALE_INTL_MAP[activeKey.value])

  function setLocale(keyOrLocale: LocaleKey | Partial<ByzLocale>) {
    if (typeof keyOrLocale === 'string') {
      activeKey.value = keyOrLocale
      locale.value    = { ...locales[keyOrLocale] }
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('byz-locale', keyOrLocale)
      }
    } else {
      locale.value = { ...nl, ...keyOrLocale }
    }
  }

  function toggle() {
    const keys = Object.keys(locales) as LocaleKey[]
    const idx  = keys.indexOf(activeKey.value)
    setLocale(keys[(idx + 1) % keys.length])
  }

  function init() {
    if (typeof localStorage === 'undefined') return
    const stored = localStorage.getItem('byz-locale') as LocaleKey | null
    if (stored && locales[stored]) setLocale(stored)
  }

  function t(key: keyof ByzLocale): string {
    return locale.value[key]
  }

  function formatDate(date: Date | string | number, opts?: Intl.DateTimeFormatOptions): string {
    return new Intl.DateTimeFormat(intlLocale.value, opts).format(new Date(date))
  }

  function formatNumber(value: number, opts?: Intl.NumberFormatOptions): string {
    return new Intl.NumberFormat(intlLocale.value, opts).format(value)
  }

  function formatCurrency(value: number, currency = 'EUR'): string {
    return new Intl.NumberFormat(intlLocale.value, { style: 'currency', currency }).format(value)
  }

  function formatRelative(date: Date | string | number, opts?: Intl.RelativeTimeFormatOptions): string {
    const diff = (new Date(date).getTime() - Date.now()) / 1000
    const rtf  = new Intl.RelativeTimeFormat(intlLocale.value, { numeric: 'auto', ...opts })
    const units: [Intl.RelativeTimeFormatUnit, number][] = [
      ['year', 31536000], ['month', 2592000], ['week', 604800],
      ['day', 86400], ['hour', 3600], ['minute', 60], ['second', 1],
    ]
    for (const [unit, secs] of units) {
      if (Math.abs(diff) >= secs) return rtf.format(Math.round(diff / secs), unit)
    }
    return rtf.format(0, 'second')
  }

  return {
    locale, currentKey, intlLocale,
    setLocale, toggle, init, t,
    formatDate, formatNumber, formatCurrency, formatRelative,
    localeLabels, localeNames, locales,
  }
}
