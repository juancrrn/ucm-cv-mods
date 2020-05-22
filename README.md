# Mods para el Campus virtual de la UCM

Algunos scripts en JavaScript (con jQuery) de mods para el Campus virtual de la Universidad Complutense de Madrid (Moodle 3.4).

## Introducción

Estos scripts modifican distintos aspectos de la web del Campus virtual general de la Universidad Complutense de Madrid (Moodle 3.4).

Los scripts están escritos en JavaScript y hacen uso de la librería jQuery (versión 3.5.1 slim). Están pensados para ser ejecutados desde el cliente (navegador) tras la carga del sitio. Para ello, se puden usar extensiones de navegador como Tampermonkey o Greasemonkey.

Se hace uso de Bootstrap, aprovechando que el tema por defecto del Campus virtual utiliza este _framework_.

## Mods

### Mod de nombres de cursos (ucm-cv-mod-course-naming.js)

Se ejecuta en varias vistas del sitio (`https://cv4.ucm.es/moodle/*`) y se encarga de _arreglar_ los nombres de los cursos, es decir, sustituirlos en títulos, listas y barras de navegación por otros definidos por el usuario. Además, se incluye la posibilidad de utilizar abreviaturas, cursos y grupos.

Este script no recoge automáticamente los cursos, sino que el usuario debe definirlos mediante el constructor de la clase `Course` e insertarlos en el array `mod.allCourses`. El constructor está definido de la siguiente forma:

```javascript
Course.constructor(
  moodleId,
  ucmCode,
  fullName,
  shortName,
  level = null,
  group = null,
  hide = false,
  year = 2020
) { ... }
```

- `moodleId` Id del curso interno de Moodle (de tipo número entero `XXXXXX`, se puede encontrar en `https://cv4.ucm.es/moodle/course/view.php?id=XXXXXX`)
- `ucmCode` Id de asignatura de la UCM (de tipo número entero con guión `XX-XXXXXX`, se puede encontrar en la vista de curso, en la navegación _breadcrumbs_, `Página Principal / Mis cursos / XX-XXXXXX / Portada`)
- `fullName` Nombre completo
- `shortName` Abreviatura
- `level` (`null` por defecto) Nivel (`1` para 1º, `2` para 2º, etc.)
- `group` (`null` por defecto) Grupo (`A`, etc.)
- `hide` (`false` por defecto) Ocultar el curso (si es `true`, no se mostrará en las listas ni en la navegación)
- `year` (`2020` por defecto) Año

De manera que, el array donde se almacenan los cursos, podría quedar así:

```javascript
mod.allCourses = [
    new Course(359416, '19-614953', 'Aplicaciones Web', 'AW', 3, 'D'),
    new Course(136429, '19-924631', 'Ingeniería del Software 2', 'IS2', 2, 'B'),
    new Course(163452, '19-254361', 'Seguridad en Redes', 'SER'),

    new Course(482540, 'seminario-invest-5248-4', 'Vengadores UCM: campo de tiro', 'Veng'),

    new Course(3879, 'EC0020', 'Espacio de coordinación de la Facultad de Informática', 'ECFDI', null, null, true),
];
```

### Mod de recolección de entregas realizadas CV UCM (ucm-cv-mod-assign-rec.js)

Se ejecuta en la vista de tarea (_assignment_) (`https://cv4.ucm.es/moodle/mod/assign/*`) y se encarga de detectar si la tarea ha sido entregada y, en dicho caso, agregarla a la cookie de almacenamiento de tareas entregadas.

### Mod de marcas de entregas realizadas (ucm-cv-mod-assign-mark.js)

Se ejecuta en la vista de curso (`https://cv4.ucm.es/moodle/course/*`) y se encarga de marcar cada tarea (_assignment_) con una insignia (_badge_) verde que indica que la misma ha sido entregada. Para ello, utiliza los valores almacenados en la cookie de almacenamiento de tareas entregadas.
