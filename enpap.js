// enpap.js

// Funzione per calcolare i contributi ENPAP
function calculateEnpap(reditoNetto, riduzioneContributi) {
    const aliquotaEnpap = 0.25; // Supponiamo un'aliquota del 25%
    let contributiInps = Math.round(reditoNetto * aliquotaEnpap);
    let accontoInps = Math.round(contributiInps * 0.80);

    // Contributi fissi ipotetici per ENPAP
    const contributiFissiIpotetici = 3000; // Ad esempio, 3.000€ all'anno

    // Calcolo delle Scadenze delle Rate Fisse
    let contributiFissiSulAnno = Math.round(contributiFissiIpotetici / 4);
    if (riduzioneContributi) {
        contributiFissiSulAnno = Math.round(contributiFissiSulAnno * 0.65);
    }

    // Aggiorna la tabella dei risultati
    document.getElementById("redditoLordoOutput").innerText = redditoLordo.toLocaleString('it-IT') + "€";
    document.getElementById("annoRedditoOutput").innerText = annoReddito;
    document.getElementById("redditoNettoOutput").innerText = reditoNetto.toLocaleString('it-IT') + "€";
    document.getElementById("aliquotaImpostaOutput").innerText = (aliquotaImposta * 100).toFixed(0) + "%";
    document.getElementById("annoRedditoOutput2").innerText = annoReddito;
    document.getElementById("impostaSostitutivaOutput").innerText = impostaSostitutiva.toLocaleString('it-IT') + "€";
    document.getElementById("annoAccontoImposta").innerText = annoReddito + 1;
    document.getElementById("accontoImpostaOutput").innerText = accontoImposta.toLocaleString('it-IT') + "€";
    document.getElementById("annoRedditoOutput3").innerText = annoReddito;
    document.getElementById("contributiInpsOutput").innerText = contributiInps.toLocaleString('it-IT') + "€";
    document.getElementById("annoRedditoOutput4").innerText = annoReddito;
    document.getElementById("contributiFissiOutput").innerText = contributiFissiSulAnno.toLocaleString('it-IT') + "€";
    document.getElementById("annoRedditoOutput5").innerText = annoReddito;
    document.getElementById("contributiVariabiliOutput").innerText = ""; // Non applicabile per ENPAP
    document.getElementById("annoRedditoOutput6").innerText = annoReddito;
    document.getElementById("totaleContributiInpsOutput").innerText = contributiInps.toLocaleString('it-IT') + "€";
    document.getElementById("contributiFissiIpoteticiOutput").innerText = contributiFissiIpotetici.toLocaleString('it-IT') + "€";
    document.getElementById("annoAccontoInps").innerText = annoReddito + 1;
    document.getElementById("accontoInpsOutput").innerText = accontoInps.toLocaleString('it-IT') + "€";

    // Gestione della visualizzazione delle righe
    contributiFissiIpoteticiRow.style.display = "table-row";
    document.getElementById("contributiInpsRow").style.display = "none";
    document.getElementById("contributiFissiRow").style.display = "table-row";
    document.getElementById("contributiVariabiliRow").style.display = "none";
    document.getElementById("totaleContributiInpsRow").style.display = "table-row";

    // Calcolo delle Scadenze
    const annoScadenza = annoReddito + 1;
    document.getElementById("annoScadenzaGiugno").innerText = annoScadenza;
    document.getElementById("annoScadenzaNovembre").innerText = annoScadenza;

    document.getElementById("annoScadenzaGiugnoDettaglio").innerText = annoScadenza;
    document.getElementById("annoScadenzaNovembreDettaglio").innerText = annoScadenza;
    document.getElementById("annoAccontoImpostaDettaglio").innerText = annoReddito + 1;
    document.getElementById("annoAccontoImpostaDettaglio2").innerText = annoReddito + 1;
    document.getElementById("annoAccontoInpsDettaglio").innerText = annoReddito + 1;

    // Popolazione delle Scadenze Generali
    let totaleGiugno = impostaSostitutiva + Math.round(accontoImposta / 2) + contributiInps + Math.round(accontoInps / 2);
    let dettaglioGiugno = `Saldo Imposta Sostitutiva (${impostaSostitutiva.toLocaleString('it-IT')}€) + Prima Rata Acconto Imposta (${Math.round(accontoImposta / 2).toLocaleString('it-IT')}€) + Contributi ENPAP (${contributiInps.toLocaleString('it-IT')}€) + Prima Rata Acconto ENPAP (${Math.round(accontoInps / 2).toLocaleString('it-IT')}€)`;
    let totaleNovembre = Math.round(accontoImposta / 2) + Math.round(accontoInps / 2);
    let dettaglioNovembre = `Seconda Rata Acconto Imposta (${Math.round(accontoImposta / 2).toLocaleString('it-IT')}€) + Seconda Rata Acconto ENPAP (${Math.round(accontoInps / 2).toLocaleString('it-IT')}€)`;

    document.getElementById("totaleGiugno").innerText = totaleGiugno.toLocaleString('it-IT') + "€";
    document.getElementById("dettaglioGiugno").innerText = dettaglioGiugno + "€";
    document.getElementById("totaleNovembre").innerText = totaleNovembre.toLocaleString('it-IT') + "€";
    document.getElementById("dettaglioNovembre").innerText = dettaglioNovembre + "€";

    // Mostra le scadenze delle rate fisse per ENPAP
    document.getElementById("scadenzaFissa1Row").style.display = "none";
    document.getElementById("scadenzaFissa2Row").style.display = "none";
    document.getElementById("scadenzaFissa3Row").style.display = "none";
    document.getElementById("scadenzaFissa4Row").style.display = "none";

    rateScadenze.forEach(rate => {
        document.getElementById("scadenzaFissa" + rate.id).innerText = rate.scadenza;
        document.getElementById("importoFissa" + rate.id).innerText = contributiFissiSulAnno.toLocaleString('it-IT');
        document.getElementById("dettaglioFissa" + rate.id).innerText = rate.dettaglio;
        document.getElementById("scadenzaFissa" + rate.id + "Row").style.display = "table-row";
    });

    // Popola la sezione "Come si Calcolano"
    let dettaglioTesto = `In regime forfettario paghi l'imposta sostitutiva, che nel tuo caso è del ${(aliquotaImposta * 100).toFixed(0)}%.<br><br>`;
    dettaglioTesto += `Paghi inoltre i contributi fissi ENPAP di <strong><u>${contributiFissiSulAnno.toLocaleString('it-IT')}€</u></strong> per quest'anno.<br><br>`;
    dettaglioTesto += `Normalmente invece per un anno completo i contributi fissi sono di <u>${contributiFissiIpotetici.toLocaleString('it-IT')}€</u>.<br><br>`;
    dettaglioTesto += `Paghi anche i contributi variabili del 25% sull'eccedenza di <u>${(redditoNetto - sogliaReddito).toLocaleString('it-IT')}€</u>.<br><br>`;

    // Esempio di calcolo
    dettaglioTesto += `<h3>Esempio di calcolo:</h3>`;
    dettaglioTesto += `<p>Per un incasso di ${redditoLordo.toLocaleString('it-IT')}€, il ${(coefficienteRedditivita * 100).toFixed(0)}% corrisponde a ${redditoNetto.toLocaleString('it-IT')}€. Su questo importo, dovrai pagare:</p>`;
    
    dettaglioTesto += `<ul>`;
    dettaglioTesto += `<li>Imposta sostitutiva: ${(aliquotaImposta * 100).toFixed(0)}% su ${redditoNetto.toLocaleString('it-IT')}€, che equivale a <strong><span class="highlight-yellow">${impostaSostitutiva.toLocaleString('it-IT')}€</span></strong>.</li>`;
    
    // Calcolo dei contributi fissi e variabili
    dettaglioTesto += `<li>Contributi ENPAP: <strong><span class="highlight-yellow">${contributiInps.toLocaleString('it-IT')}€</span></strong> di contributi fissi e <strong><span class="highlight-yellow">0€</span></strong> di contributi variabili (non applicabile per ENPAP).</li>`;
    dettaglioTesto += `</ul>`;
    
    const totaleSaldo = impostaSostitutiva + contributiInps;
    const totalecontributi = contributiInps;
    dettaglioTesto += `<p>Quindi, a livello di saldo, pagherai <strong><span class="highlight-yellow">${totaleSaldo.toLocaleString('it-IT')}€</span></strong> (di cui <span class="highlight-yellow">${impostaSostitutiva.toLocaleString('it-IT')}€</span> di imposta e <span class="highlight-yellow">${totalecontributi.toLocaleString('it-IT')}€</span> di contributi).</p>`;
    
    // Acconti
    const accontoImposta = impostaSostitutiva;
    const accontoInps = Math.round(contributiInps * 0.80);
    const totaleAcconti = accontoImposta + accontoInps;
    dettaglioTesto += `<h3>Acconti:</h3>`;
    dettaglioTesto += `<p>Oltre al saldo, dovrai versare anche gli acconti per l’anno successivo:</p>`;
    dettaglioTesto += `<ul>`;
    dettaglioTesto += `<li>Imposta sostitutiva: pagherai il 100% dell'importo del saldo come acconto, quindi ulteriori <strong><span class="highlight-blue">${accontoImposta.toLocaleString('it-IT')}€</span></strong>.</li>`;
    dettaglioTesto += `<li>Contributi ENPAP: pagherai l’80% dell'importo dei contributi fissi come acconto, quindi <strong><span class="highlight-blue">${accontoInps.toLocaleString('it-IT')}€</span></strong>.</li>`;
    dettaglioTesto += `</ul>`;
    
    const totaleComplessivo = totaleSaldo + totaleAcconti;
    dettaglioTesto += `<h3>Totale complessivo:</h3>`;
    dettaglioTesto += `<p>Saldo totale: <strong><span class="highlight-yellow">${totaleSaldo.toLocaleString('it-IT')}€</span></strong> (di cui <span class="highlight-yellow">${impostaSostitutiva.toLocaleString('it-IT')}€</span> di imposta e <span class="highlight-yellow">${contributiInps.toLocaleString('it-IT')}€</span> di contributi)</p>`;
    dettaglioTesto += `<p>Acconti totali: <strong><span class="highlight-blue">${totaleAcconti.toLocaleString('it-IT')}€</span></strong> (di cui <span class="highlight-blue">${accontoImposta.toLocaleString('it-IT')}€</span> di imposta e <span class="highlight-blue">${accontoInps.toLocaleString('it-IT')}€</span> di contributi)</p>`;
    dettaglioTesto += `<p>Importo complessivo (saldo + acconti): <strong>${totaleComplessivo.toLocaleString('it-IT')}€</strong></p>`;
    
    dettaglioTesto += `<p>Questi importi sono indicativi e, in sede di dichiarazione dei redditi, verranno calcolati con precisione.</p>`;
    
    dettaglioCalcoli.innerHTML = dettaglioTesto;

    // Popola la sezione "Dettaglio pagamenti"
    document.getElementById("detAnnoPagamenti").innerText = annoReddito;
    document.getElementById("detRedditoLordoPagamenti").innerText = redditoLordo.toLocaleString('it-IT');
    document.getElementById("detRedditoLordoDetPagamenti").innerText = redditoLordo.toLocaleString('it-IT');
    document.getElementById("detCoefficienteDetPagamenti").innerText = (coefficienteRedditivita * 100).toFixed(0) + "%";
    document.getElementById("detRedditoNettoPagamenti").innerText = reditoNetto.toLocaleString('it-IT');
    document.getElementById("detRedditoNettoDetPagamenti").innerText = reditoNetto.toLocaleString('it-IT');
    document.getElementById("detAliquotaImpostaPagamenti").innerText = (aliquotaImposta * 100).toFixed(0) + "%";
    document.getElementById("detImpostaSostitutivaPagamenti").innerText = impostaSostitutiva.toLocaleString('it-IT');

    document.getElementById("detContributiInpsTitoloPagamenti").innerText = "ENPAP";
    document.getElementById("detRedditoNettoInpsPagamenti").innerText = reditoNetto.toLocaleString('it-IT');
    document.getElementById("detAliquotaContributivaPagamenti").innerText = "25%";
    document.getElementById("detContributiInpsCalcolatiPagamenti").innerText = contributiInps.toLocaleString('it-IT');

    // Calcolo dei Saldi e Acconti
    document.getElementById("detSaldoImpostaPagamenti").innerText = impostaSostitutiva.toLocaleString('it-IT');
    document.getElementById("detAccontoImpostaPagamenti").innerText = accontoImposta.toLocaleString('it-IT');
    document.getElementById("detPrimaRataImpostaPagamenti").innerText = Math.round(accontoImposta / 2).toLocaleString('it-IT');
    document.getElementById("detSecondaRataImpostaPagamenti").innerText = Math.round(accontoImposta / 2).toLocaleString('it-IT');

    document.getElementById("detSaldoContributiPagamenti").innerText = contributiInps.toLocaleString('it-IT');
    document.getElementById("detAccontoContributiPagamenti").innerText = accontoInps.toLocaleString('it-IT');
    document.getElementById("detPrimaRataContributiPagamenti").innerText = Math.round(accontoInps / 2).toLocaleString('it-IT');
    document.getElementById("detSecondaRataContributiPagamenti").innerText = Math.round(accontoInps / 2).toLocaleString('it-IT');
    document.getElementById("detContributiInpsTipoPagamenti").innerText = "ENPAP";

    // Riepilogo dei Pagamenti
    const totaleTasseContributi = impostaSostitutiva + contributiInps;
    const totaleAcconti = accontoImposta + accontoInps;
    const totaleComplessivo = totaleTasseContributi + totaleAcconti;

    // Calcolo delle percentuali rispetto al reddito lordo
    const percentualeTotaleTasseContributi = ((totaleTasseContributi / redditoLordo) * 100).toFixed(0) + "%";
    const percentualeTotaleAcconti = ((totaleAcconti / redditoLordo) * 100).toFixed(0) + "%";
    const percentualeTotaleComplessivo = ((totaleComplessivo / redditoLordo) * 100).toFixed(0) + "%";

    document.getElementById("detTotaleTasseContributiPagamenti").innerText = totaleTasseContributi.toLocaleString('it-IT');
    document.getElementById("detTotaleAccontiPagamenti").innerText = totaleAcconti.toLocaleString('it-IT');
    document.getElementById("detTotaleComplessivoPagamenti").innerText = totaleComplessivo.toLocaleString('it-IT');

    document.getElementById("percentualeTotaleTasseContributi").innerText = percentualeTotaleTasseContributi;
    document.getElementById("percentualeTotaleAcconti").innerText = percentualeTotaleAcconti;
    document.getElementById("percentualeTotaleComplessivo").innerText = percentualeTotaleComplessivo;

    // Mostra le sezioni dei risultati e delle schede
    document.getElementById("risultati-container").style.display = "block";
    document.getElementById("schede-container").style.display = "block";
});

// Funzione per scaricare il PDF (invariata)
downloadButton.addEventListener("click", async function() {
    // ... (logica esistente per il download del PDF)
});
