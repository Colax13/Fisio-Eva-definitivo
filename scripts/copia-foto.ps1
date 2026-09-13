<#
  Copia gli scatti dello shooting dentro il sito, con i nomi che il codice si
  aspetta.

  Da lanciare su Windows, dalla cartella del repo:

      powershell -ExecutionPolicy Bypass -File scripts\copia-foto.ps1

  Se l'export sta altrove, passa il percorso:

      powershell -ExecutionPolicy Bypass -File scripts\copia-foto.ps1 -Export "D:\altro\_export_editing"

  NOTA: cinque di questi scatti mostrano il volto della persona in trattamento.
  Su indicazione dello studio si usano gli originali, non le versioni tagliate
  della cartella 05_privacy. Presuppone che la persona ripresa abbia dato il
  consenso a comparire sul sito.
#>

param(
  [string]$Export = "E:\AI\FisioEva\FisioEVA\_export_editing",
  [string]$Repo = "."
)

$mappa = @(
  @{ da = "01_verticali\FisioEVA_terapia-manuale_schiena_DSC9963.jpg";              a = "public\foto\terapia-manuale-schiena.jpg" }
  @{ da = "01_verticali\FisioEVA_valutazione-posturale_spalle_DSC9947.jpg";         a = "public\foto\valutazione-posturale-spalle.jpg" }
  @{ da = "01_verticali\FisioEVA_brand_reception_DSC9972.jpg";                      a = "public\foto\sede-reception.jpg" }
  @{ da = "01_verticali\FisioEVA_relazione_sorriso-durante-il-lavoro_DSC9729.jpg";  a = "public\foto\relazione-sorriso.jpg" }
  @{ da = "01_verticali\FisioEVA_terapia-manuale_caviglia_DSC9843.jpg";             a = "public\foto\terapia-manuale-caviglia.jpg" }
  @{ da = "01_verticali\FisioEVA_tecar_fianco_DSC9699.jpg";                         a = "public\foto\tecar-fianco.jpg" }
  @{ da = "01_verticali\FisioEVA_laser_spalla_DSC9639.jpg";                         a = "public\foto\laser-spalla.jpg" }
  @{ da = "01_verticali\FisioEVA_laser_gomito_DSC9625.jpg";                         a = "public\foto\laser-gomito.jpg" }
  @{ da = "01_verticali\FisioEVA_professionalita_occhiali-laser_DSC9621.jpg";       a = "public\foto\professionalita-occhiali-laser.jpg" }
  @{ da = "01_verticali\FisioEVA_tecnologia_mano-su-touchscreen_DSC9617.jpg";       a = "public\foto\tecnologia-touchscreen.jpg" }

  @{ da = "02_orizzontali\FisioEVA_terapia-manuale_momento-di-cura_DSC9907.jpg";    a = "public\foto\terapia-manuale-momento-di-cura.jpg" }
  @{ da = "02_orizzontali\FisioEVA_terapia-manuale_ginocchio_DSC9840.jpg";          a = "public\foto\terapia-manuale-ginocchio.jpg" }
  @{ da = "02_orizzontali\FisioEVA_team_gruppo-istituzionale_DSC9565.jpg";          a = "public\foto\team-gruppo.jpg" }
  @{ da = "02_orizzontali\FisioEVA_team_gruppo-relazionale_DSC9572.jpg";            a = "public\foto\team-gruppo-relazionale.jpg" }
  @{ da = "02_orizzontali\FisioEVA_brand_logo-sul-camice_DSC9849.jpg";              a = "public\foto\brand-logo-camice.jpg" }

  @{ da = "03_ritratti\FisioEVA_ritratto_azzurra-de-angelis_01_DSC9530.jpg";        a = "public\team\azzurra.jpg" }
  @{ da = "03_ritratti\FisioEVA_ritratto_elisa-de-rubeis_01_DSC9499.jpg";           a = "public\team\elisa.jpg" }
  @{ da = "03_ritratti\FisioEVA_ritratto_veronica-mirarchi_01_DSC9557.jpg";         a = "public\team\veronica.jpg" }

  @{ da = "04_macchinari\FisioEVA_tecar_consolle-in-trattamento_DSC9703.jpg";       a = "public\foto\tecar-in-trattamento.jpg" }
  @{ da = "04_macchinari\FisioEVA_sala_lettino-e-laser-veduta_DSC9594.jpg";         a = "public\foto\sala-lettino-e-laser.jpg" }
  @{ da = "04_macchinari\FisioEVA_laser_ilux-e-lettino_DSC9589.jpg";                a = "public\foto\laser-ilux.jpg" }
  @{ da = "04_macchinari\FisioEVA_tecar_fisiowarm-e-lettino_DSC9581.jpg";           a = "public\foto\tecar-fisiowarm.jpg" }

  # Scatti in cui il volto è visibile: su indicazione dello studio si usano gli
  # originali, non le versioni tagliate della cartella 05_privacy.
  @{ da = "01_verticali\FisioEVA_osteopatia_craniale-dettaglio_DSC9753.jpg";        a = "public\foto\osteopatia-craniale-dettaglio.jpg" }
  @{ da = "02_orizzontali\FisioEVA_osteopatia_craniale-mani-capo_DSC9771.jpg";      a = "public\foto\osteopatia-craniale-mani-capo.jpg" }
  @{ da = "02_orizzontali\FisioEVA_osteopatia_cervicale_DSC9899.jpg";               a = "public\foto\osteopatia-cervicale.jpg" }
  @{ da = "01_verticali\FisioEVA_terapia-manuale_sostegno-cervicale_DSC9921.jpg";   a = "public\foto\terapia-manuale-sostegno-cervicale.jpg" }
  @{ da = "01_verticali\FisioEVA_valutazione-posturale_profilo_DSC9945.jpg";        a = "public\foto\valutazione-posturale-profilo.jpg" }
)

New-Item -ItemType Directory -Force -Path (Join-Path $Repo "public\foto") | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $Repo "public\team") | Out-Null

$fatte = 0
$mancanti = @()

foreach ($v in $mappa) {
  $sorgente = Join-Path $Export $v.da
  $destinazione = Join-Path $Repo $v.a
  if (Test-Path $sorgente) {
    Copy-Item $sorgente $destinazione -Force
    $fatte++
  } else {
    $mancanti += $v.da
  }
}

Write-Host ""
Write-Host "Copiate $fatte foto su $($mappa.Count)." -ForegroundColor Green

if ($mancanti.Count -gt 0) {
  Write-Host ""
  Write-Host "NON TROVATE (controlla i nomi nell'export):" -ForegroundColor Yellow
  $mancanti | ForEach-Object { Write-Host "  $_" }
} else {
  Write-Host ""
  Write-Host "Ora:  git add public  &&  git commit -m ""Foto dello shooting""  &&  git push"
}
