# Test Plan – Sauce Demo E-commerce

**Proyecto:** Sauce Demo (https://www.saucedemo.com)
**Autor:** [Tu Nombre] – QA Analyst
**Fecha:** Agosto 2026
**Versión:** 1.0

---

## 1. Introducción

Este documento define la estrategia de pruebas para la aplicación web **Sauce Demo**, un sitio de e-commerce simulado utilizado como entorno de práctica de QA. El objetivo es validar el correcto funcionamiento de los flujos principales de la aplicación: autenticación, catálogo de productos, carrito de compras y proceso de checkout.

Este Test Plan forma parte de un proyecto de portafolio personal, con el fin de demostrar habilidades de diseño y documentación de pruebas de software.

## 2. Alcance

### 2.1 Dentro del alcance
- Módulo de Login (autenticación de usuarios)
- Listado y visualización de productos
- Carrito de compras (agregar, quitar, modificar cantidad)
- Proceso de Checkout (datos del cliente, resumen de compra, finalización)
- Validación de los distintos tipos de usuario de prueba (standard, locked out, problem, performance glitch)

### 2.2 Fuera del alcance
- Pruebas de carga y performance a nivel de infraestructura
- Pruebas de seguridad (penetration testing)
- Compatibilidad con navegadores legacy (IE11 o inferior)

## 3. Estrategia de pruebas

| Tipo de prueba | Aplica | Herramienta |
|---|---|---|
| Funcional (manual) | Sí | Ejecución manual con casos documentados |
| Exploratoria | Sí | Sesiones basadas en checklist |
| Regresión | Sí | Casos críticos re-ejecutados por release |
| Automatizada (E2E) | Sí (subset) | Cypress |
| Usabilidad | Parcial | Observación durante ejecución manual |

## 4. Usuarios de prueba

Sauce Demo provee usuarios predefinidos, cada uno pensado para exponer comportamientos distintos:

| Usuario | Comportamiento esperado |
|---|---|
| standard_user | Flujo normal sin errores |
| locked_out_user | Debe ser bloqueado al intentar loguearse |
| problem_user | Presenta bugs visuales/funcionales intencionales |
| performance_glitch_user | Presenta demoras de carga anormales |
| error_user | Presenta errores en checkout |
| visual_user | Presenta diferencias visuales sutiles |

*(Contraseña para todos: `secret_sauce`)*

## 5. Ambiente de pruebas

- **URL:** https://www.saucedemo.com
- **Navegadores:** Chrome (principal), Firefox (secundario)
- **Resoluciones:** Desktop 1920x1080, Mobile 375x667 (simulado)
- **Datos de prueba:** Usuarios predefinidos del sistema (ver sección 4)

## 6. Criterios de entrada y salida

**Criterios de entrada:**
- Ambiente accesible y estable
- Casos de prueba diseñados y revisados

**Criterios de salida:**
- 100% de los casos críticos ejecutados
- Sin bugs críticos o bloqueantes abiertos sin triage
- Reporte de resultados documentado

## 7. Entregables

- Casos de prueba (Test Cases)
- Reportes de bugs encontrados
- Script de automatización E2E (Cypress) para el flujo crítico de compra
- Resumen de ejecución (Test Summary Report)

## 8. Riesgos

| Riesgo | Impacto | Mitigación |
|---|---|---|
| Comportamientos intencionalmente rotos en usuarios "problem/error" pueden confundirse con bugs reales del sistema base | Medio | Documentar claramente qué usuario se usó en cada caso |
| Aplicación de demo puede cambiar sin aviso | Bajo | Versionar capturas de pantalla y fechas de ejecución |
