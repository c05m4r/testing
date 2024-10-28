import { test, expect } from '@playwright/test';
import { SandboxPage } from './Pages/SandboxPage.spec';


test.describe('Grupo de tests de TheFreeRangeTesters', {
    tag: '@with_pom',
}, () => {

    test('Título correcto', async ({ page }) => {

        await page.goto('');

        const sandbox = new SandboxPage(page);

        await test.step('Verifico el título', async ()=>{
            await expect(page).toHaveTitle(sandbox.title);
        });

    });

    test('Verificacion de botón dinámico', async ({ page }) => {

        await page.goto('');

        const sandbox = new SandboxPage(page);

        await test.step('Verifico que NO sea visible', async ()=>{
            await expect(sandbox.botonDinamicoTextoOculto).toBeHidden();
        });

        await test.step('Realizo click sobre el botón', async ()=>{
            await sandbox.botonDinamicoClick();
        });

        await test.step('Verifico que sea visible', async ()=>{
            await expect(sandbox.botonDinamicoTextoOculto).toBeVisible();    
        });

    });

    test('Verificacion de input', async ({ page }) => {

        await page.goto('');
        
        const sandbox = new SandboxPage(page);

        await test.step('Verifico que el input sea editable', async ()=>{
            await expect(sandbox.input).toBeEditable();
        });

        await test.step('Completo el input', async ()=>{
            sandbox.inputFill();
        });
        
        await test.step('Verifico que texto sea el esperado ', async ()=>{
            await expect(sandbox.input).toHaveValue('Hola mundo!');
        });

    });

    test('Verificacion de checkboxes', async ({ page }) => {

        await page.goto('');

        const sandbox = new SandboxPage(page);

        await test.step('Realizo un check', async ()=>{
            sandbox.checkAllCheckboxes();
        });
        
        await test.step('Verifico el check', async ()=>{
            for (const label of sandbox.checkboxLabels) {
                await expect(sandbox.page.getByLabel(label)).toBeChecked();
            }
        });

        await test.step('Realizo un uncheck', async ()=>{
            sandbox.uncheckAllCheckboxes();
        });

        await test.step('Verifico el uncheck', async ()=>{
            for (const label of sandbox.checkboxLabels) {
                await expect(sandbox.page.getByLabel(label)).not.toBeChecked();
            }
        });

    });

    test('Verificacion de radiobuttons', async ({ page }) => {

        await page.goto('');

        const sandbox = new SandboxPage(page);

        await test.step('Verifico el uncheck', async ()=>{
            for (const label of sandbox.radiobuttonLabels) {
                await expect(sandbox.page.getByLabel(label)).not.toBeChecked();
            }
        });

        await test.step('Realizo un check en Si', async ()=>{
            await sandbox.radiobuttonSi.check();
        });
        
        await test.step('Verifico el check en Si', async ()=>{
            await expect(sandbox.radiobuttonSi).toBeChecked();
        });

        await test.step('Realizo un check en No', async ()=>{
            await sandbox.radiobuttonNo.check();
        });

        await test.step('Verifico el check en No', async ()=>{
            await expect(sandbox.radiobuttonNo).toBeChecked();
        });

    });

    test.fixme('Verificacion de dropdown - easy', async ({ page }) => {

        await page.goto('');

        const sandbox = new SandboxPage(page);

        await test.step('Selecciono un deporte', async ()=>{
            sandbox.seleccionarDropdownDeportes();
        });

        await test.step('Valido opciones en el dropdown', async ()=>{
            sandbox.validarDeportes();
        });

    });

    test('Verificacion de dropdown - hard', async ({ page }) => {

        await page.goto('');

        const sandbox = new SandboxPage(page);

        await test.step('Selecciono un día de la semana', async ()=>{
            await sandbox.seleccionarDiaSemana();
        });

    });

    test('Verificacion del popup', async ({ page }) => {

        await page.goto('');

        const sandbox = new SandboxPage(page);

        await test.step('Muestro el popup', async ()=>{
            await sandbox.mostrarPopup();
        });

        await test.step('Valido el popup', async ()=>{
            await expect(sandbox.botonPopupTextoPopupEjemplo).toHaveText('Popup de ejemplo');
            await expect(sandbox.botonPopupTextoAparecioPopup).toHaveText('¿Viste? ¡Apareció un Pop-up!');
        });

        await test.step('Cierro el popup', async ()=>{
            await sandbox.cerrarPopup();
        });

    });

    test.fixme('Upload de archivos', async ({ page }) => {

        await test.step('Ingreso a la página web', async ()=>{
            await page.goto('');
        });

        await test.step('Selecciono los archivos a subir', async ()=>{
            await page.getByLabel('Upload file').setInputFiles(['file1.pdf', 'file2.pdf']);
        });

        await test.step('Los deselecciono', async ()=>{
            await page.getByLabel('Upload file').setInputFiles([]);
        });

    });

    test.skip('Realizar Drag and Drop', async ({ page }) => {

        await test.step('Ingreso a la página web', async ()=>{
            await page.goto('');
        });

        await test.step('Realizo Drag and Drop', async ()=>{
            await page.getByTestId('DragFrom').dragTo(page.getByTestId('DragTo'));
        });

    });

    test('Verificación de tabla estática', async ({ page }) => {

        await page.goto('');

        const sandbox = new SandboxPage(page);

        await test.step('Valido tabla estática', async ()=>{

            const valoresColumnaNombres = await sandbox.cargarColumnaNombresTablaEstatica();

            expect(valoresColumnaNombres).toEqual(sandbox.tablaEstaticaNombres);

        });
        
    });

    test('Verificación de tabla dinámica', async ({ page }) => {

        await page.goto('');

        const sandbox = new SandboxPage(page);

        await test.step('Valido tabla dinámica', async ()=>{
            const valoresTablaDinamica = await sandbox.cargarTablaDinamica();
            
            await page.reload();

            const valoresPostReload = await sandbox.cargarTablaDinamica();

            // Con soft si las validaciones fallan, no detienen la ejecución
            expect.soft(valoresTablaDinamica).not.toEqual(valoresPostReload);
        });

    });

    test('Verificación del Shadow DOM', async ({ page }) => {

        await page.goto('');

        const sandbox = new SandboxPage(page);

        await test.step('Valido los textos', async ()=>{
            await expect(sandbox.shadowDOMh2).toHaveText('Shadow DOM');
            await expect(sandbox.shadowDOMp).toHaveText('Este es un ejemplo de Shadow DOM para practicar automation testing.');
        });

    });

});

