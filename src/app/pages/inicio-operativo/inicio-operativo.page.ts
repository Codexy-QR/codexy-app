import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { addIcons } from 'ionicons';
import { AlertController } from '@ionic/angular';
import {
  arrowBackOutline,
  cloudUploadOutline,
  personCircleOutline,
  chatbubbleEllipsesOutline,
  documentTextOutline,
  homeOutline,
  informationCircleOutline,
  qrCodeOutline,
  ellipsisHorizontalCircleOutline,
  personAddOutline,
  checkmarkOutline,
  logOutOutline,
  checkmarkDoneOutline,
  closeOutline,
} from 'ionicons/icons';

// Componentes
import { ExportadorComponent } from 'src/app/components/exportador/exportador.component';

// Servicios
import { CategoryService } from 'src/app/services/category.service';
import { OperatingService } from 'src/app/services/operating.service';
import { AuthService } from 'src/app/services/auth.service';
import { InventoryService } from 'src/app/services/inventary.service';
import { StartInventoryRequestDto } from 'src/app/Interfaces/start-inventory-request.model';
import { FinishRequestDto } from 'src/app/Interfaces/finish-request.model';

// Modelos

@Component({
  selector: 'app-inicio-operativo',
  templateUrl: './inicio-operativo.page.html',
  styleUrls: ['./inicio-operativo.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ExportadorComponent],
})
export class InicioOperativoPage implements OnInit {
  categorias: any[] = [];
  cargando = true;
  operatingGroupId: number | null = null;
  isInviteOpen = false;
  code = ['D', '8', 'K', '4'];

  isObservacionesOpen = false;
  observacionTexto: string = '';

  isExitOpen = false;
  isConfirmOpen = false;
  isExportOpen = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private inventaryService: InventoryService,
    private operatingService: OperatingService,
    private authService: AuthService,
    private alertController: AlertController
  ) {
    addIcons({
      cloudUploadOutline,
      personCircleOutline,
      chatbubbleEllipsesOutline,
      documentTextOutline,
      homeOutline,
      qrCodeOutline,
      informationCircleOutline,
      ellipsisHorizontalCircleOutline,
      personAddOutline,
      arrowBackOutline,
      checkmarkOutline,
      logOutOutline,
      checkmarkDoneOutline,
      closeOutline,
    });
  }

  async ngOnInit() {
    const zonaId = Number(this.route.snapshot.paramMap.get('zonaId'));
    const user = await this.authService.getUserFromToken();
    const userId = user?.userId ?? 0;

    this.categoryService.getItemsByCategory(zonaId).subscribe({
      next: (data) => {
        this.categorias = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error cargando categorías:', err);
        this.cargando = false;
      },
    });

    if (userId) {
      this.operatingService.GetOperatingId(userId).subscribe({
        next: (data) => {
          this.operatingGroupId = data.operatingGroupId;
        },
        error: (err) => {
          console.error('Error obteniendo operating', err);
        },
      });
    } else {
      console.warn('No se pudo obtener userId del token');
    }
  }

  goToItem(categoria: any) {
    this.router.navigate(
      [
        '/inicio-mouse',
        categoria.id,
        this.route.snapshot.paramMap.get('zonaId'),
      ],
      {
        state: { categoria },
      }
    );
  }

  openInviteModal() {
    this.isInviteOpen = true;
  }
  closeInviteModal() {
    this.isInviteOpen = false;
  }

  isInstructionsOpen = false;

  openInstructionsModal() {
    this.isInstructionsOpen = true;
  }

  closeInstructionsModal() {
    this.isInstructionsOpen = false;
  }
  openObservacionesModal() {
    this.isObservacionesOpen = true;
  }

  closeObservacionesModal() {
    this.isObservacionesOpen = false;
  }

  openExitModal() {
    this.isExitOpen = true;
  }
  closeExitModal() {
    this.isExitOpen = false;
  }

  openConfirmModal() {
    this.isConfirmOpen = true;
  }
  closeConfirmModal() {
    this.isConfirmOpen = false;
  }

  openExportModal() {
    this.isExportOpen = true;
  }
  closeExportModal() {
    this.isExportOpen = false;
  }

  async guardarObservacion() {
    console.log(
      'Observación guardada:',
      this.observacionTexto || '(sin texto)'
    );
    this.closeObservacionesModal();

    const alert = await this.alertController.create({
      header: 'Observación guardada',
      message: this.observacionTexto.trim()
        ? 'Tu observación ha sido guardada correctamente.'
        : 'No escribiste ninguna observación, pero fue guardada como vacía.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  // === Finalizar inventario ===
  async finalizarInventario() {
    const inventaryId = this.inventaryService.getInventaryId();

    if (!inventaryId) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No hay un inventario activo para finalizar.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    const observations = this.observacionTexto?.trim() || '';

    const request: FinishRequestDto = {
      inventaryId: inventaryId,
      observations,
    };

    try {
      await this.inventaryService.finish(request).toPromise();

      this.inventaryService.setInventaryId(0);
      this.observacionTexto = '';
      this.closeConfirmModal();

      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Inventario finalizado correctamente.',
        buttons: ['OK'],
      });
      await alert.present();

      alert.onDidDismiss().then(() => {
        this.router.navigate(['/login']);
      });
    } catch (error: any) {
      console.error('Error al finalizar inventario:', error);

      let errorMessage = 'No se pudo finalizar el inventario.';

      if (error?.error?.message) errorMessage = error.error.message;
      else if (error?.status === 400)
        errorMessage = 'Datos inválidos. Verifica la información.';
      else if (error?.status === 404)
        errorMessage = 'Inventario no encontrado.';

      const alert = await this.alertController.create({
        header: 'Error',
        message: errorMessage,
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  async iniciarInventario() {
    const zonaId = Number(this.route.snapshot.paramMap.get('zonaId'));
    if (!this.operatingGroupId) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se pudo obtener el grupo operativo.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    const currentInventaryId = this.inventaryService.getInventaryId();
    if (currentInventaryId) {
      this.router.navigate(['/scanner/', zonaId]);
      return;
    }

    const alert = await this.alertController.create({
      header: 'Iniciar inventario',
      message: '¿Estás seguro de iniciar el inventario en esta zona?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Iniciar',
          handler: () => {
            const request: StartInventoryRequestDto = {
              zoneId: zonaId,
              operatingGroupId: this.operatingGroupId!,
            };

            this.inventaryService.start(request).subscribe({
              next: (res) => {
                this.inventaryService.setInventaryId(res.inventaryId);
                console.log('Inventario iniciado con ID:', res.inventaryId);
                this.router.navigate(['/scanner', zonaId]);
              },
              error: async (err) => {
                const errorAlert = await this.alertController.create({
                  header: 'Error',
                  message: 'No se pudo iniciar el inventario.',
                  buttons: ['OK'],
                });
                await errorAlert.present();
              },
            });
          },
        },
      ],
    });

    await alert.present();
  }

  confirmarInventario() {
    console.log('Inventario confirmado y notificado al encargado de zona');
    this.closeConfirmModal();
  }
}
