import { type Locator, type Page } from "@playwright/test"

export class SandboxPage {
    readonly page: Page;
    readonly title: string;
    readonly checkboxLabels: string[];
    readonly radiobuttonLabels: string[];
    readonly pastaCheckbox: Locator;
    readonly botonDianamico: Locator;
    readonly botonDinamicoTextoOculto: Locator;
    readonly input: Locator;
    readonly radiobuttonNo: Locator;
    readonly radiobuttonSi: Locator;
    readonly dropdownDeportes: Locator;
    readonly deporte: string;
    readonly deportes: string[];
    readonly diasSemana: string[];
    readonly botonDiaSemana: Locator;
    readonly botonPopup: Locator;
    readonly botonPopupTextoPopupEjemplo: Locator;
    readonly botonPopupTextoAparecioPopup: Locator;
    readonly botonPopupCerrar: Locator;
    readonly shadowDOMh2: Locator;
    readonly shadowDOMp: Locator;
    readonly tablaEstaticaNombres: string[];

    constructor(page: Page) {
        this.page = page;
        this.title = 'Automation Sandbox';
        this.botonDianamico = page.getByRole('button', { name: 'Hacé click para generar un ID' });
        this.botonDinamicoTextoOculto = page.getByText('OMG, aparezco después de 3');
        this.input = page.getByPlaceholder('Ingresá texto');
        this.checkboxLabels = ['Pizza 🍕', 'Hamburguesa 🍔', 'Pasta 🍝', 'Helado 🍧' ,'Torta 🍰'];
        this.radiobuttonLabels = ['Si', 'No'];
        this.radiobuttonSi = page.getByLabel('Si');
        this.radiobuttonNo = page.getByLabel('No');
        this.dropdownDeportes = page.getByLabel('Dropdown');
        this.deportes = ['Fútbol', 'Tennis', 'Basketball'];
        this.diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
        this.botonDiaSemana = page.getByRole('button', { name: 'Día de la semana' });
        this.botonPopup = page.getByRole('button', { name: 'Mostrar popup' });
        this.botonPopupTextoPopupEjemplo = page.locator('#contained-modal-title-vcenter');
        this.botonPopupTextoAparecioPopup = page.getByLabel('Popup de ejemplo').getByRole('paragraph');
        this.botonPopupCerrar = page.getByRole('button', { name: 'Cerrar' });
        this.shadowDOMh2 = page.locator('#shadow-root-example').getByText('Shadow DOM', { exact: true });
        this.shadowDOMp = page.locator('#shadow-host');
        this.tablaEstaticaNombres = ['Messi', 'Ronaldo', 'Mbappe'];
    }

    async botonDinamicoClick(){
        await this.botonDianamico.click({ force: true });
    }

    async inputFill(){
        await this.input.fill('Hola mundo!');
    }

    async checkAllCheckboxes() {
        for (const label of this.checkboxLabels) {
            await this.page.getByLabel(label).check();
        }
    }
    
    async uncheckAllCheckboxes() {
        for (const label of this.checkboxLabels) {
            await this.page.getByLabel(label).uncheck();
        }
    }

    async seleccionarDropdownDeportes() {
        for (const deporte of this.deportes) {
            await this.dropdownDeportes.selectOption(deporte);
        }
    }

    async validarDeportes() {
        for(let deporte of this.deportes){
            const elemento = await this.page.$(`select#formBasicSelect > option:is(:text("${deporte}"))`);
            if(!elemento)
                throw new Error(`La opción ${deporte} no está presente.`);
            }
    }

    async seleccionarDiaSemana() {
        for(let dia of this.diasSemana){
            const diaLocator = this.page.getByRole('link', { name: dia })
            await this.botonDiaSemana.click();
            await diaLocator.click();
            await this.botonDiaSemana.press('Escape');
        }
    }

    async mostrarPopup(){
        await this.botonPopup.click();
    }

    async cerrarPopup(){
        await this.botonPopupCerrar.click();
    }

    async cargarColumnaNombresTablaEstatica(){
        return this.page.$$eval('h2:has-text("Tabla estática") + table tbody tr td:nth-child(2)', elements => elements.map(element => element.textContent));
    }

    async cargarTablaDinamica(){
        return this.page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
    }
}
