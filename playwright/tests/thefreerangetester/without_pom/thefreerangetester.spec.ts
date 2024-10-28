import { test, expect } from '@playwright/test';

test.describe('Grupo de tests de TheFreeRangeTesters', {
  tag: '@without_pom',
  annotation: {
    type: 'issue',
    description: 'https://github.com/microsoft/playwright/issues/23180',
  }
}, () => {

  test('Título correcto', async ({ page }) => {

    await page.goto('');

    await test.step('Verifico el título', async ()=>{
      await expect(page).toHaveTitle('Automation Sandbox');
    })

  });

  test('Verificacion de botón dinámico', async ({ page }) => {

    await page.goto('');

    await test.step('Verifico que NO sea visible', async ()=>{
      await expect(page.getByText('OMG, aparezco después de 3')).toBeHidden();    
    })

    await test.step('Realizo click sobre el botón', async ()=>{
      await page.getByRole('button', { name: 'Hacé click para generar un ID' }).click({ force: true });
      // await page.getByRole('button', { name: 'Hacé click para generar un ID' }).click({ button: 'right' });
      // await page.getByRole('button', { name: 'Hacé click para generar un ID' }).click({ modifiers:['Shift'] });
      // await page.getByRole('button', { name: 'Hacé click para generar un ID' }).dblclick();
      // await page.getByRole('button', { name: 'Hacé click para generar un ID' }).hover();
    })

    await test.step('Verifico que sea visible', async ()=>{
      await expect(page.getByText('OMG, aparezco después de 3')).toBeVisible();    
    })

  });

  test('Verificacion de input', async ({ page }) => {

    await page.goto('');
    
    await test.step('Verifico que el input sea editable', async ()=>{
      await expect(page.getByPlaceholder('Ingresá texto')).toBeEditable();
    })

    await test.step('Completo el input', async ()=>{
      // await page.getByPlaceholder('Ingresá texto').fill('Hola mundo!');
      await page.getByPlaceholder('Ingresá texto').type('Hola mundo!');
      // await page.waitForTimeout(2000); // Espera 2 segundos
    })
    
    await test.step('Verifico que texto sea el esperado ', async ()=>{
      await expect(page.getByPlaceholder('Ingresá texto')).toHaveValue('Hola mundo!');
    })

  });

  test('Verificacion de checkboxes', async ({ page }) => {

    await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');

    await test.step('Realizo un check', async ()=>{
      await page.getByLabel('Pizza 🍕').check();
      await page.getByLabel('Hamburguesa 🍔').check();
      await page.getByLabel('Pasta 🍝').check();
      await page.getByLabel('Helado 🍧').check();
      await page.getByLabel('Torta 🍰').check();
    })
    
    await test.step('Verifico el check', async ()=>{
      await expect(page.getByLabel('Pizza 🍕')).toBeChecked();
      await expect(page.getByLabel('Hamburguesa 🍔')).toBeChecked();
      await expect(page.getByLabel('Pasta 🍝')).toBeChecked();
      await expect(page.getByLabel('Helado 🍧')).toBeChecked();
      await expect(page.getByLabel('Torta 🍰')).toBeChecked();
      await expect(page.getByLabel('Pasta 🍝')).toBeChecked();
    })

    await test.step('Realizo un uncheck', async ()=>{
      await page.getByLabel('Pizza 🍕').uncheck();
      await page.getByLabel('Hamburguesa 🍔').uncheck();
      await page.getByLabel('Pasta 🍝').uncheck();
      await page.getByLabel('Helado 🍧').uncheck();
      await page.getByLabel('Torta 🍰').uncheck();
    })

    await test.step('Verifico el uncheck', async ()=>{
      await expect(page.getByLabel('Pizza 🍕')).not.toBeChecked();
      await expect(page.getByLabel('Hamburguesa 🍔')).not.toBeChecked();
      await expect(page.getByLabel('Pasta 🍝')).not.toBeChecked();
      await expect(page.getByLabel('Helado 🍧')).not.toBeChecked();
      await expect(page.getByLabel('Torta 🍰')).not.toBeChecked();
      await expect(page.getByLabel('Pasta 🍝')).not.toBeChecked();
    })

  });

  test('Verificacion de radiobuttons', async ({ page }) => {

    await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');

    await test.step('Verifico el uncheck', async ()=>{
      await expect(page.getByLabel('Si')).not.toBeChecked();
      await expect(page.getByLabel('No')).not.toBeChecked();
    })

    await test.step('Realizo un check en Si', async ()=>{
      await page.getByLabel('Si').check();
    })
    
    await test.step('Verifico el check en Si', async ()=>{
      await expect(page.getByLabel('Si')).toBeChecked();
    })

    await test.step('Realizo un check en No', async ()=>{
      await page.getByLabel('No').check();
    })

    await test.step('Verifico el check en No', async ()=>{
      await expect(page.getByLabel('No')).toBeChecked();
    })

  });

  test('Verificacion de dropdown - easy', async ({ page }) => {

    await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');

    await test.step('Selecciono un deporte', async ()=>{
      await page.getByLabel('Dropdown').selectOption('Fútbol');
    })

    await test.step('Valido opciones en el dropdown', async ()=>{
      const deportes = ['Fútbol', 'Tennis', 'Basketball'];

      for(let deporte of deportes){
        const elemento = await page.$(`select#formBasicSelect > option:is(:text("${deporte}"))`);
        if(!elemento)
          throw new Error(`La opción ${deporte} no está presente.`);
      }
    })

  });

  test('Verificacion de dropdown - hard', async ({ page }) => {

    await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');

    await test.step('Selecciono un deporte', async ()=>{
      await page.getByRole('button', { name: 'Día de la semana' }).click();
      await page.getByRole('link', { name: 'Martes' }).click();
      await page.getByRole('button', { name: 'Día de la semana' }).press('Escape');
    })

  });

  test('Verificacion del popup', async ({ page }) => {

    await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');

    await test.step('Muestro el popup', async ()=>{
      await page.getByRole('button', { name: 'Mostrar popup' }).click();
    })

    await test.step('Valido el popup', async ()=>{
      // await expect(page.locator('#contained-modal-title-vcenter')).toContainText('Popup de ejemplo');
      // await expect.soft(page.locator('#contained-modal-title-vcenter')).toHaveText('Popup de ejempl');
      await expect(page.locator('#contained-modal-title-vcenter')).toHaveText('Popup de ejemplo');
      await expect(page.getByLabel('Popup de ejemplo').getByRole('paragraph')).toHaveText('¿Viste? ¡Apareció un Pop-up!');
    })

    await test.step('Cierro el popup', async ()=>{
      await page.getByRole('button', { name: 'Cerrar' }).click();
    })

  });

  test.fixme('Upload de archivos', async ({ page }) => {

    await test.step('Ingreso a la página web', async ()=>{
      await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
    })

    await test.step('Selecciono los archivos a subir', async ()=>{
      await page.getByLabel('Upload file').setInputFiles(['file1.pdf', 'file2.pdf']);
    })

    await test.step('Los deselecciono', async ()=>{
      await page.getByLabel('Upload file').setInputFiles([]);
    })

  });

  test.skip('Realizar Drag and Drop', async ({ page }) => {

    await test.step('Ingreso a la página web', async ()=>{
      await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
    })

    await test.step('Realizo Drag and Drop', async ()=>{
      await page.getByTestId('DragFrom').dragTo(page.getByTestId('DragTo'));
    })

  });

  test('Verificación de tabla estática', async ({ page }) => {

    await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');

    await test.step('Valido tabla estática', async ()=>{
      const valoresColumnaNombres = await page.$$eval('h2:has-text("Tabla estática") + table tbody tr td:nth-child(2)', elements => elements.map(element => element.textContent));

      const nombresEsperados = ['Messi', 'Ronaldo', 'Mbappe'];
      
      // await test.info().attach('screenshot', {
      //     body: await page.screenshot(),
      //     contentType: 'image/png',
      // })

      expect(valoresColumnaNombres).toEqual(nombresEsperados);
    })
  
  });

  test('Verificación de tabla dinámica', async ({ page }) => {

    await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');

    await test.step('Valido tabla dinámica', async ()=>{
      const valoresTablaDinamica = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
      // console.log(valoresTablaDinamica);

      await page.reload();

      const valoresPostReload = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
      // console.log(valoresPostReload);

      // Con soft si las validaciones fallan, no detienen la ejecución
      expect.soft(valoresTablaDinamica).not.toEqual(valoresPostReload);
    })

  });

  test('Verificación del Shadow DOM', async ({ page }) => {

    await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');

    await test.step('Valido los textos', async ()=>{
      await expect(
        page.locator('#shadow-root-example')
        .getByText('Shadow DOM', { exact: true })
      ).toHaveText('Shadow DOM');
      await expect(page.locator('#shadow-host')).toHaveText('Este es un ejemplo de Shadow DOM para practicar automation testing.');
    });

  })


});
