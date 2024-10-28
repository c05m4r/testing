# Playwright

## Instalación


```bash
npm init playwright@latest
```

## Actualización


```bash
npm install -D @playwright/test@latest
npx playwright install --with-deps
```


## Ejecutar tests


```bash
npx playwright test
npx playwright test --ui
npx playwright test --reporter=html
npx playwright test nombretest
npx playwright test nombretest --headed
npx playwright test nombretest --trace on
npx playwright test --grep "Nombre Funcion" 
npx playwright test --grep @NombreDelTag
npx playwright test --project=NombreDeProyecto
```


### Ejecutar test con debugging


```bash
npx playwright test nombretest --debug
PWDEBUG=console npx playwright test nombretest
DEBUG=pw:api npx playwright test nombretest
```


## Mostrar reporte


```bash
npx playwright show-report
```

## Grabar un test


```bash
npx playwright codegen demo.playwright.dev/todomvc
```


# Buenas Prácticas

* Usar POM

* Separar el modelado de la página de la validación, es decir no crees métodos que validen dentro del objeto page, hacelo por fuera

* Evitar en lo posible Xpath y selectores CSS

* Se recomienda usar TestId
