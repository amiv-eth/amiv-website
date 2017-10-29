// src/statuten.js
// HTML obtained by converting the 'statuten' LaTeX file using
// pandoc amiv-statuten.tex -s -o amiv-statuten.html -t html5
// TODO: As soon as we decide on a css framework we'll have to add some typography
const m = require('mithril');

module.exports = {
  view() {
    return m.trust(`
    <h1 id='name-und-zweck-des-vereins'>Name und Zweck des Vereins</h1>
    <p>Weibliche und männliche Bezeichnungen werden im Folgenden synonym verwendet.</p>
    <h4 id='name-und-sitz'>Name und Sitz</h4>
    <p><br />
    Der AMIV (Akademischer Maschinen- und Elektroingenieur Verein an der Eidgenössischen Technischen Hochschule Zürich) ist 1893 gegründet worden und ist ein autonomer Fachverein gemäss der Statuten des Verbandes der Studierenden an der ETH (VSETH) und des Schweizerischen Zivilgesetzbuches (ZGB). Er ist der Fachverein der Studierenden an den Departementen <a href='http://www.mavt.ethz.ch/'>“Maschinenbau und Verfahrenstechnik'</a>sowie <span><a href='http://www.ee.ethz.ch/'>“Informationstechnologie und Elektrotechnik'</a></span>. Sitz des AMIV ist die Universitätsstrasse 6, 8092 Zürich.</p>
    <h4 id='Zweck'>Zweck</h4>
    <p><br />
    Der AMIV ist politisch und konfessionell neutral, nicht gewinnorientiert und verfolgt keine kommerziellen Zwecke. Zweck des Vereins ist den Studierenden, die Integration in die Gemeinschaft der Hochschule erleichtern und sich ihrer Probleme anzunehmen. Dieser Zweck wird verfolgt:</p>
    <ol>
    <li><p>durch Vertretung gegenüber Lehrkörper, Hochschulgremien und -behörden,[HoPo]</p></li>
    <li><p>durch Beratung in Studienfragen,[Beratung]</p></li>
    <li><p>durch Vertretung gegenüber Industrie, Wirtschaft und anderen Hochschulen,[ER]</p></li>
    <li><p>durch eine rasche und umfassende Information mit geeigneten Mitteln,[PR]</p></li>
    <li><p>durch die Unterstützung mit Hilfsmitteln für das Studium,[Fileserver]</p></li>
    <li><p>durch die Durchführung von Exkursionen,[Exkursionen]</p></li>
    <li><p>durch die Veranstaltung von Vorträgen und Diskussionen,[Vortraege]</p></li>
    <li><p>durch die Organisation von geselligen, sportlichen und kulturellen Anlässen.[Kultur]</p></li>
    </ol>
    <h1 id='mitglieder'>Mitglieder</h1>
    <h4 id='Mitglieder'>Formen der Mitgliedschaft</h4>
    <p><br />
    Der Verein besteht aus</p>
    <ol>
    <li><p>ordentlichen Mitgliedern,</p></li>
    <li><p>ausserordentlichen Mitgliedern,</p></li>
    <li><p>Ehrenmitgliedern.</p></li>
    </ol>
    <h4 id='ordentliche-mitglieder'>Ordentliche Mitglieder</h4>
    <p><br />
    Ordentliche Mitglieder des Vereins sind automatisch alle VSETH-Mitglieder, die den Departementen <span><a href='http://www.mavt.ethz.ch/'>“Maschinenbau und Verfahrenstechnik'</a></span>oder <span><a href='http://www.ee.ethz.ch/'>“Informationstechnologie und Elektrotechnik'</a></span>der ETH Zürich angehören. Der Mitgliederrat (MR) des VSETH beschliesst die Zuordnung von Studiengängen zum AMIV (§ 13 der VSETH-Statuten). Ordentliche Mitglieder leisten ihren Mitgliederbeitrag pro Semester direkt an den VSETH. Ausschliesslich der VSETH legt die Höhe des Beitrages fest.</p>
    <h4 id='ausserordentliche-mitglieder'>Ausserordentliche Mitglieder</h4>
    <p><br />
    Die ausserordentliche Mitgliedschaft können alle natürlichen Personen erlangen, denen die ordentliche Mitgliedschaft im AMIV nicht offensteht.Die Bewerbung als ausserordentliches Mitglied erfolgt schriftlich beim Vorstand. Eine beschlussfähige Vorstandssitzung entscheidet über die Aufnahme. Der Vorstand informiert die Generalversammlung über alle seit der letzten Generalversammlung aufgenommenen ausserordentlichen Mitglieder. Bei Nicht-Aufnahme durch den Vorstand steht dem Gesuchsteller bzw. der Gesuchstellerin das Recht auf Rekurs an der Generalversammlung zu. Diese entscheidet endgültig. Ausserordentliche Mitglieder leisten einen Mitgliederbeitrag von CHF 10.- pro Semester direkt an den AMIV. Bei einer Aufnahme muss der Beitrag für das laufende Semester in voller Höhe geleistet werden.</p>
    <h4 id='ehrenmitglieder'>Ehrenmitglieder</h4>
    <p><br />
    Die Ehrenmitgliedschaft können alle natürlichen Personen erlangen, die einen substanziellen Beitrag zum Vereinswesen des AMIV geliefert haben. Über die Aufnahme von Ehrenmitgliedern entscheidet die Generalversammlung mit Zweidrittelmehrheit. Anträge auf Ehrenmitgliedschaft müssen 10 (zehn) Tage vor der GV gestellt werden. Ehrenmitglieder haben keinen Mitgliederbeitrag zu leisten.</p>
    <h4 id='Rechte_der_Mitglieder'>Rechte der Mitglieder</h4>
    <p><br />
    ’0 Jedes ordentliche Mitglied besitzt aktives und passives Wahlrecht sowie Stimmrecht.<span><br />
    </span>’S Jedes ausserordentliche Mitglied besitzt aktives und passives Wahlrecht sowie Stimmrecht, jedoch nicht das Wahlrecht für folgende Gremien (§ 13 der VSETH-Statuten):</p>
    <ol type='a'>
    <li><p>Präsidium oder Hochschulpolitik des Fachvereinsvorstands;</p></li>
    <li><p>FR-Delegierte</p></li>
    <li><p>MR-Delegierte</p></li>
    <li><p>Vertretungen des Studienganges</p></li>
    </ol>
    <p>Ausserdem besitzen diese Personen kein aktives Wahlrecht für den Fachvereinsvorstand. Im Weiteren können diese Personen nicht mehr als zwei Personen im Vorstand ausmachen. Mitglieder welche den Kategorien c, d und f, nach Art. 6 gemäss der Statuten des Verbandes der Studierenden an der ETH (VSETH), angehören und Nicht-Mitglieder besitzen für oben genannte Ämter auch kein passives Wahlrecht.</p>
    <p>’S Jedes Mitglied gemäss [Mitglieder] geniesst sämtliche Vorteile des Vereins und besitzt das Antrags- sowie Vorschlagsrecht zuhanden des Vorstandes oder der Generalversammlung. Die Mitglieder haben jederzeit Einblick in die Protokolle. Sie können Revisorenberichte, Bilanzen und das Budget vor der Generalversammlung einsehen.</p>
    <h4 id='pflichten-der-mitglieder'>Pflichten der Mitglieder</h4>
    <p><br />
    ’0 Jedes Mitglied ist gehalten, alle vom Vorstand einberufenen Versammlungen zu besuchen.<span><br />
    </span>’S Jedes Mitglied ist verpflichtet, die von ihm übernommenen Arbeiten genau auszuführen.<span><br />
    </span>’S Jedes Mitglied ist verpflichtet, sich generell an die von offiziellen AMIV-Organen festgelegten Regeln zu halten.<span><br />
    </span>’S Pflichtverletzungen können mit Ausschluss gemäss [Ausschuss] geahndet werden.</p>
    <h4 id='ende-der-mitgliedschaft'>Ende der Mitgliedschaft</h4>
    <p><br />
    Die Mitgliedschaft erlischt automatisch durch</p>
    <ol>
    <li><p>Austritt aus dem VSETH (für ordentliche Mitglieder),</p></li>
    <li><p>Nichtbezahlen des Semesterbeitrages (für ausserordentliche Mitglieder),</p></li>
    <li><p>Ausschluss durch die Generalversammlung,</p></li>
    <li><p>Todesfall.</p></li>
    </ol>
    <h4 id='Ausschuss'>Ausschluss</h4>
    <p><br />
    Die Generalversammlung kann ein Mitglied mit Zweidrittelmehr von Ämtern, Veranstaltungen und Dienstleistungen des AMIV ausschliessen (ausgenommen sind die Sitzungen der Generalversammlung) und den zuständigen Organen des VSETH Antrag auf Ausschluss des Mitglieds aus dem VSETH stellen.</p>
    <h1 id='vereinsvermögen'>Vereinsvermögen</h1>
    <h4 id='mittel'>Mittel</h4>
    <p><br />
    Die Einnahmen des AMIV bestehen grundsätzlich aus den vom VSETH ihm zugewiesenen Mitteln. Er kann sich weitere Einnahmequellen erschliessen.</p>
    <h4 id='haftung'>Haftung</h4>
    <p><br />
    Für die Verbindlichkeiten des AMIV haftet ausschliesslich das Vereinsvermögen. Die Haftung der Mitglieder ist beschränkt auf den Mitgliederbeitrag.</p>
    <h1 id='organe-des-vereins'>Organe des Vereins</h1>
    <h4 id='Organe'>Organe</h4>
    <p><br />
    Die Organe des Vereins sind:</p>
    <ol>
    <li><p>die Generalversammlung (GV),</p></li>
    <li><p>der Vorstand,</p></li>
    <li><p>die Kommissionen,</p></li>
    <li><p>die Vertreter in hochschulpolitischen Gremien,</p></li>
    <li><p>die Revisoren. Die Generalversammlung ist das oberste Organ des Vereins. Sie ist befugt, im Rahmen seiner Statuten, über alle Belange des AMIV zu verhandeln und zu beschliessen.</p></li>
    </ol>
    <h2 id='generalversammlung-gv'>Generalversammlung (GV)</h2>
    <h4 id='Ordentliche_Generalversammlung'>Ordentliche Generalversammlung</h4>
    <p><br />
    Ordentliche Generalversammlungen finden einmal pro Semester statt. Hierzu werden die Mitglieder per E-Mail, auf der AMIV Website und per Aushang mindestens 14 (vierzehn) Tage vorher eingeladen. Die folgenden Dokumente müssen 7 (sieben) Tage vor der GV für alle Mitglieder publiziert werden:</p>
    <ol type='a'>
    <li><p>Traktandenliste</p></li>
    <li><p>provisorisches Budget, vorläufige Abrechnung und Zwischenrevisionsbericht (bei Herbstsemester-GVs)</p></li>
    <li><p>komplette Abrechnung und Revisionsbericht (bei Frühjahrssemester-GVs)</p></li>
    <li><p>alle fristgerecht eingegangenen Anträge und Änderungsanträge</p></li>
    </ol>
    <h4 id='ausserordentliche-generalversammlung'>Ausserordentliche Generalversammlung</h4>
    <p><br />
    Der Präsident beruft eine ausserordentliche Generalversammlung ein auf Verlangen</p>
    <ol>
    <li><p>der Vorstandsmehrheit, oder</p></li>
    <li><p>von wenigstens einem Vierzigstel aller stimmberechtigten Mitglieder, oder</p></li>
    <li><p>des Fachvereinsrates des VSETH (FR) (§ 13 der VSETH-Statuten), oder</p></li>
    <li><p>der Revisoren,</p></li>
    </ol>
    <p>wenn ihm ein schriftlicher Antrag vorliegt. Die Mitglieder werden dabei wie zu einer ordentlichen GV gemäss [Ordentliche_Generalversammlung] eingeladen.</p>
    <h4 id='beschlussfähigkeit'>Beschlussfähigkeit</h4>
    <p><br />
    ’0 Jede ordnungsgemäss einberufene ordentliche GV ist beschluss- und wahlfähig.<span><br />
    </span>’S Jede ordnungsgemäss einberufene ausserordentliche GV ist beschluss- und wahlfähig, wenn mindestens ein Vierzigstel der stimmberechtigten Mitglieder anwesend ist.</p>
    <h4 id='geschäfte'>Geschäfte</h4>
    <p><br />
    Die GV</p>
    <ol type='a'>
    <li><p>genehmigt das Protokoll,</p></li>
    <li><p>genehmigt die Rechnung,</p></li>
    <li><p>entlastet den Vorstand,</p></li>
    <li><p>legt das Budget fest,</p></li>
    <li><p>wählt die Vereins-Organe gemäss [Organe] für die Amtsdauer von einem Semester,</p></li>
    <li><p>revidiert die Statuten gemäss [Statuten] oder löst den Verein auf gemäss [Vereinsauflösung], und</p></li>
    <li><p>behandelt Anträge der Mitglieder</p></li>
    </ol>
    <h4 id='Antragsfristen'>Antragsfristen</h4>
    <p><br />
    ’0 Budget-Anträge mit einem Gesamtaufwand über mehr als CHF 1000.-, sowie alle Änderungsanträge an das genehmigte Budget, müssen 10 (zehn) Tage vor der GV dem Vorstand schriftlich vorgelegt und begründet werden. Sofern es der aktuell gewählte Vorstand einstimmig zulässt, können diese Anträge auch direkt an der GV gestellt werden. <span><br />
    </span>’S Sonstige Anträge (insbesondere Budget-Anträge mit einem Gesamtaufwand von unter CHF 1000.-) können direkt an der GV vorgetragen werden. Sie müssen vor der Abstimmung über den Antrag schriftlich eingereicht werden.</p>
    <h4 id='geschäftsordnung'>Geschäftsordnung</h4>
    <p><br />
    Die Details zur Einberufung und dem Ablauf einer GV (namentlich alle Verfahrensregeln, die Anwendung finden) sind in der 'Geschäftsordnung der AMIV Generalversammlung' im Anhang A zu diesen Statuten geregelt.</p>
    <h4 id='protokoll'>Protokoll</h4>
    <p><br />
    Alle Beschlüsse werden protokolliert. Das Protokoll muss spätestens 30 (dreissig) Tage später im offiziellen Organ des AMIV publiziert werden und gilt weitere 30 (dreissig) Tage später als provisorisch genehmigt, sofern keine schriftlichen Änderungsanträge beim Vorstand eingegangen sind.</p>
    <h2 id='vorstand'>Vorstand</h2>
    <h4 id='zusammensetzung'>Zusammensetzung</h4>
    <p><br />
    Der Vorstand setzt sich folgendermassen zusammen:</p>
    <ol type='a'>
    <li><p>Präsident</p></li>
    <li><p>Quästor</p></li>
    <li><p>Ressort für Hochschulpolitik</p></li>
    <li><p>Ressort für Information</p></li>
    <li><p>Ressort für Kultur</p></li>
    <li><p>Ressort für Externe Beziehungen</p></li>
    <li><p>Ressort für Infrastruktur</p></li>
    <li><p>Ressort für IT</p></li>
    </ol>
    <p>Ämterkumulation ist zulässig.</p>
    <h4 id='aufgabe'>Aufgabe</h4>
    <p><br />
    ’0 Der Vorstand wird im Sinne des Vereinszwecks tätig. Er leitet als Exekutive den Verein, führt die Geschäfte und vollzieht die Beschlüsse der Generalversammlung. Die Realisierung der Vereinszwecke</p>
    <ol type='a'>
    <li><p>gemäss [Zweck].[HoPo] und [Zweck].[Beratung] ist Sache des Ressorts für Hochschulpolitik,</p></li>
    <li><p>gemäss [Zweck].[ER] Sache des Ressorts für Externe Beziehungen,</p></li>
    <li><p>gemäss [Zweck].[PR] und [Zweck].[Fileserver] Sache des Ressorts für Information,</p></li>
    <li><p>gemäss [Zweck].[Exkursionen], [Zweck].[Vortraege] und [Zweck].[Kultur] Sache des Ressorts für Kultur.</p></li>
    </ol>
    <p>’S Das Ressort für Infrastruktur übernimmt alle Aufgaben im Zusammenhang mit der Bewirtschaftung der Räumlichkeiten des AMIV, das Ressort IT alle Aufgaben im Zusammenhang mit der IT-Infrastruktur des AMIV.</p>
    <h4 id='vorstandssitzungen'>Vorstandssitzungen</h4>
    <p><br />
    ’0 Der Vorstand hält während des Semesters mindestens einmal wöchentlich Sitzungen ab, geleitet durch den Präsidenten. Die Vorstandsmitglieder erstatten zuhanden des Präsidenten Bericht über ihre Tätigkeit seit der letzten Sitzung.<span><br />
    </span>’S Der Vorstand ist beschlussfähig, wenn mindestens die Hälfte der Vorstandsmitglieder anwesend ist. Es entscheidet das absolute Mehr aller anwesenden Vorstandsmitglieder. Bei Stimmengleichheit hat der Präsident den Stichentscheid.<span><br />
    </span>’S An der ersten Vorstandssitzung nach der GV ist ein Vizepräsident innerhalb des Vorstands zu wählen, welcher in Abwesenheit des Präsidenten dessen Rechte und Pflichten übernimmt. Der Vizepräsident muss ein ordentliches Mitglied sein.</p>
    <h4 id='pflichten-der-vorstandsmitglieder'>Pflichten der Vorstandsmitglieder</h4>
    <p><br />
    ’0 Der Präsident vertritt den Verein nach innen und nach aussen, beruft alle Generalversammlungen und Vorstandssitzungen ein und leitet diese. Durch Beschluss der Versammlung kann die Leitung einem anderen Mitglied übertragen werden. Der Präsident hat Einsichtsrecht in alle Geschäftsbücher. Der Präsident vertritt den AMIV im Fachvereinsrat (FR) des VSETH; auf Wunsch kann er dieses Amt delegieren.<span><br />
    </span>’S Der Quästor besorgt das Rechnungswesen. Die Details hierfür sind im 'Finanreglement des AMIV'im Anhang B dieser Statuten geregelt.<span><br />
    </span>’S Die weiteren Pflichten jedes Vorstands-Ressorts sind in einem Pflichtenheft aufgeführt, die den Statuten immer beizulegen und der GV zur Information vorzulegen sind.</p>
    <h4 id='zeichnungsberechtigung'>Zeichnungsberechtigung</h4>
    <p><br />
    ’0 Grundsätzlich ist jedes Vorstandsmitglied zusammen mit dem Präsidenten oder dem Quästor kollektiv zu zweien zeichnungsberechtigt. Der Gesamt-Vorstand ist über geleistete Zeichnungen zu informieren.<span><br />
    </span>’S Abweichende und ergänzende Regelungen betreffend der Vereinskonten sind im Anhang B 'Finanzreglement des AMIV'aufgeführt.</p>
    <h4 id='finanzkompetenz'>Finanzkompetenz</h4>
    <p><br />
    ’0 Ein Budgetposten kann von der GV an eine verantwortliche Person gebunden werden. Der Vorstand verfügt über die nicht personengebundenen Budgetposten. ’S Der Vorstand hat, sofern beschlussfähig, folgende Kompetenzen:</p>
    <ol>
    <li><p>Ausserordentliche Geschäfte, welche nicht im Budget aufgeführt sind, und die einen einmaligen Gesamtaufwand bis CHF 1000.- erfordern, können in den Vorstandssitzungen genehmigt werden.</p></li>
    <li><p>Ausserordentliche Geschäfte, welche nicht im Budget aufgeführt sind, und die einen einmaligen Gesamtaufwand bis CHF 3000.- erfordern, können in den Vorstandssitzungen genehmigt werden, falls der Quästor anwesend ist und dadurch der budgetierte Erfolg der Rechnungsperiode nicht unterschritten wird.</p></li>
    <li><p>Der Präsident und der Quästor haben Vetorecht bei ausserordentlichen Geschäften. Dieses kann durch zwei Drittel aller gewählten Vorstände überstimmt werden.</p></li>
    <li><p>Eine Veranstaltung gemäss §2.6, §2.7 und §2.8 gilt nicht als ausserordentliches Geschäft.</p></li>
    </ol>
    <p>’S Das Ressort für Kultur verfügt über den Budgetposten'FS Event Topf'und 'HS Event Topf'. Diese Budgetposten haben die Aufgabe, kurzfristig geplante Veranstaltungen gemäss §2.6, §2.7 und §2.8, welche über kein eigenes Budget verfügen, zu finanzieren. Das Ressort für Kultur hat zusammen mit dem restlichen Vorstand folgende Kompetenzen:</p>
    <ol>
    <li><p>Events, welche nicht im Budget aufgeführt sind, und einen einmaligen Gesamtaufwand bis CHF 1000.- erfordern, können vom Ressort für Kultur genehmigt werden. Auf Antrag eines einzelnen Vorstands kann über das Budget des Events abgestimmt werden.</p></li>
    <li><p>Events, welche nicht im Budget aufgeführt sind, und einen einmaligen Gesamtaufwand bis CHF 3000.- erfordern, müssen an einer beschlussfähigen Vorstandssitzung zur Genehmigung vorgestellt werden. Die Vorstandssitzung kann den Event genehmigen, falls der Quästor anwesend ist.</p></li>
    <li><p>Der Präsident und der Quästor haben Vetorecht bei Event Budgets. Dieses kann durch zwei Drittel aller gewählten Vorstände überstimmt werden.</p></li>
    </ol>
    <h2 id='kommissionen'>Kommissionen</h2>
    <h4 id='grundlage'>Grundlage</h4>
    <p><br />
    Bei Bedarf kann die GV Kommissionen bilden, welche jeweils einem Vorstandsressort oder dem Vorstand als Ganzes unterstehen. Die GV legt für jede einzelne Kommission deren Rechte und Pflichten in einem Kommissionsreglement fest. Dieses regelt Organisation, Tätigkeit und Kompetenzen der Kommission.</p>
    <h4 id='organisation'>Organisation</h4>
    <p><br />
    ’0 Jede Kommission hat einen gewählten Präsidenten, und für den Fall einer eigenen Rechnungsführung einen gewählten Quästor. <span><br />
    </span>’S Der Kommissionspräsident orientiert den Vorstand bzw. das zuständige Vorstandsmitglied laufend über die Arbeit. Er erstattet am Ende jedes Semesters zuhanden der GV Bericht über die Tätigkeit der Kommission. <span><br />
    </span>’S Kommissionen ohne eigene Rechnungsführung können einen gewählten Finanzverantwortlichen haben.</p>
    <h4 id='finanzen'>Finanzen</h4>
    <p><br />
    Kommissionen können sich eigene Einnahmequellen erschliessen, haben jedoch grundsätzlich keine eigene Rechnungsführung. Die Rechte, Pflichten und Kompetenzen bezüglich der Finanzen von Kommissionen sind im'Finanzreglement des AMIV'im Anhang B der Statuten geregelt.</p>
    <h4 id='auflösung'>Auflösung</h4>
    <p><br />
    Kommissionen können durch die GV mit den Stimmen von zwei Dritteln der anwesenden Stimmberechtigten aufgelöst werden. Das Eigentum der Kommissionen geht bei Auflösung an den Verein über.</p>
    <h2 id='vertreter-in-hochschulpolitischen-gremien'>Vertreter in hochschulpolitischen Gremien</h2>
    <h4 id='aufgabe-1'>Aufgabe</h4>
    <p><br />
    Die Vertreter in hochschulpolitischen Gremien vertreten die Interessen des AMIV in den für die Hochschulpolitik zuständigen Gremien der Departemente D-MAVT und D-ITET sowie im Mitgliederrat (MR) des VSETH.</p>
    <h4 id='organisation-1'>Organisation</h4>
    <p><br />
    Die Aufsicht über die Vertreter haben die Vorstände im Ressort Hochschulpolitik, an diese muss durch die Vertreter auch regelmässig Bericht erstattet werden.</p>
    <h2 id='revisoren'>Revisoren</h2>
    <h4 id='aufgabe-2'>Aufgabe</h4>
    <p><br />
    Die Revisoren kontrollieren die Arbeit des Vorstandes und insbesondere das Rechnungswesen des Vereins inklusive aller Kommissionen. Sie erstatten einen Revisionsbericht mit Empfehlungen an die GV.</p>
    <h4 id='wahl'>Wahl</h4>
    <p><br />
    Zur Wahl zum Revisor dürfen sich sämtliche natürliche und juristische Personen wählen lassen, insbesondere auch ausserordentliche und Ehrenmitglieder.</p>
    <h4 id='organisation-2'>Organisation</h4>
    <p><br />
    Die Revisorengruppe besteht aus drei Mitgliedern. Vorstandsmitglieder können der Revisorengruppe nicht angehören. Die Revisoren können einen geschulten Buchhalter zu Rate ziehen.</p>
    <h1 id='schlussbestimmungen'>Schlussbestimmungen</h1>
    <h4 id='Vereinsauflösung'>Vereinsauflösung</h4>
    <p><br />
    Über Auflösung des Vereins entscheidet die GV. Zum Beschluss der Auflösung sind die Stimmen von wenigstens der Hälfte aller ordentlichen Mitglieder notwendig. Bei Auflösung des Vereins wird sein Eigentum dem VSETH übergeben.</p>
    <h4 id='Statuten'>Statuten</h4>
    <p><br />
    ’0 Zu den Statuten gehören folgende Anhänge. Sie unterliegen den selben Revisionsbedingungen wie die Statuten selbst.</p>
    <ol>
    <li><p>Anhang A: Geschäftsordnung der AMIV Generalversammlung</p></li>
    <li><p>Anhang B: Finanzreglement des AMIV</p></li>
    </ol>
    <p>’S Statutenänderungen aller Art und die Annahme der geänderten Statuten können an der GV nur mit Zustimmung von zwei Dritteln der anwesenden Stimmberechtigten und unter der Voraussetzung der Präsenz von einem Vierzigstel der stimmberechtigten Mitglieder erfolgen. <span><br />
    </span>’S Anträge auf Statutenänderung müssen mindestens 14 (vierzehn) Tage vor der GV schriftlich beim Vorstand eingereicht (und von diesem sofort publiziert) werden. Änderungsanträge hierzu dürfen von allen Mitgliedern bis spätestens 7 (sieben) Tage vor der GV schriftlich eingereicht und müssen vom Vorstand sofort publiziert werden. <span><br />
    </span>’S Die vorliegenden Statuten sind letztmals von der ordentlichen Generalversammlung vom 09. März 2017 revidiert worden. Sie ersetzen alle früheren Statuten und treten nach Genehmigung durch die zuständigen Organe des VSETH am 18. September 2017 in Kraft.</p>
    <h1 id='anhang-a-geschäftsordnung-der-amiv-generalversammlung' class='unnumbered'>Anhang A:<br />
    Geschäftsordnung der AMIV Generalversammlung</h1>
    <h4 id='sitzungsleitung'>Sitzungsleitung</h4>
    <p><br />
    Die GV wählt zu Beginn einen GV-Sitzungsleiter, der die Sitzungsleitung für die GV inne hat. Durch Beschluss der Versammlung kann jederzeit die Leitung einem anderen Mitglied übertragen werden. Bei Stimmengleichheit im relativen Mehr hat der GV-Sitzungsleiter den Stichentscheid.</p>
    <h4 id='stimm--und-wahlrecht'>Stimm- und Wahlrecht</h4>
    <p><br />
    Es gelten die Stimm- und Wahlrechte gemäss Statuten, [Rechte_der_Mitglieder], insbesondere ist auch der Vorstand stimmberechtigt und es existiert kein Stichentscheid.</p>
    <h4 id='traktandenliste'>Traktandenliste</h4>
    <p><br />
    Die Traktandenliste gibt den Ablauf der GV wider. Sie orientiert sich an den folgenden Elementen:</p>
    <ol>
    <li><p>Begrüssung und Hinweis auf die Geschäftsordnung</p></li>
    <li><p>Bestimmung der Stimmenzähler</p></li>
    <li><p>Genehmigung der Traktandenliste</p></li>
    <li><p>Genehmigung des Protokolls von der letzten GV</p></li>
    <li><p>Tätigkeitsbericht des Vorstandes und der Kommissionen</p></li>
    <li><p>(an Frühjahressemester-GVs) Vorstellung und Genehmigung der Abrechnung der vergangenen Rechnungsperiode sowie des Revisionsberichtes</p></li>
    <li><p>(an Herbstsemester-GVs) Vorstellung einer vorläufigen Abrechnung mit dem Bericht der Zwischenrevision sowie Budget-Anträge der Mitglieder</p></li>
    <li><p>Entlastung des Vorstandes</p></li>
    <li><p>Vorstellung des Semester-Programms</p></li>
    <li><p>(an Herbstsemester-GVs) Vorstellung und Genehmigung des Budgets der nächsten Rechnugsperiode</p></li>
    <li><p>Wahlen der Vereins-Organe</p></li>
    <li><p>Statutenänderungen</p></li>
    <li><p>Weitere Anträge der Mitglieder</p></li>
    <li><p>Weitere Mitteilungen der Mitglieder</p></li>
    </ol>
    <h4 id='stimmenzähler'>Stimmenzähler</h4>
    <p><br />
    ’0 Der Sitzungsleiter bestimmt durch Aufruf zwei Stimmenzähler für die gesamte Dauer der GV. Die Stimmen gelten als ausgezählt, wenn beide unabhängig voneinander auf das selbe Resultat kommen. <span><br />
    </span>’S Wahlen werden immer ausgezählt. Bei offensichtlichen Abstimmungsergebnissen kann auf das Auszählen der Stimmen verzichtet werden, wenn es keine Gegenrede gibt.</p>
    <h4 id='tätigkeitsberichte'>Tätigkeitsberichte</h4>
    <p><br />
    Der Präsident verfasst auf Grund der Berichte der anderen Vorstandsmitglieder und der Kommissionen einen Tätigkeitsbericht über das vergangene Semester. Er gilt neben dem Revisionsbericht als Basis für die Entlastung des Vorstandes.</p>
    <h1 id='anträge' class='unnumbered'>Anträge</h1>
    <h4 id='ordnungsantrag'>Ordnungsantrag</h4>
    <p><br />
    Mitglieder können Ordnungsanträge stellen auf</p>
    <ol type='a'>
    <li><p>Abbruch der Diskussion,</p></li>
    <li><p>Änderung von Modus und Form einer Abstimmung oder Wahl,</p></li>
    <li><p>Wiederholung einer Abstimmung oder Wahl,</p></li>
    <li><p>Rückkommen auf ein abgeschlossenes Traktandum,</p></li>
    <li><p>Rückweisung von Geschäften an den Antragsteller,</p></li>
    <li><p>Unterbruch der Sitzung, sowie</p></li>
    <li><p>Wegweisung eines Anwesenden.</p></li>
    </ol>
    <h4 id='behandlung-von-ordnungsanträgen'>Behandlung von Ordnungsanträgen</h4>
    <p><br />
    Direkt nach dem Ordnungsantrag darf ein Mitglied eine kurze Gegenrede halten, danach muss sofort über den Antrag abgestimmt werden. Wird keine Gegenrede gehalten, gilt der Antrag sofort als angenommen.</p>
    <h4 id='abbruch-der-diskussion'>Abbruch der Diskussion</h4>
    <p><br />
    Bei Annahme dieses Ordnungsantrags muss die laufende Diskussion sofort abgebrochen werden. Es wird einmalig eine geordnete Rednerliste erstellt. Nur Redner auf dieser Liste sowie der Vorstand dürfen im Anschluss noch über das Geschäft diskutieren, der Antragsteller hat dabei das Schlusswort.</p>
    <h4 id='änderung-von-modus-und-form-einer-abstimmung-oder-wahl'>Änderung von Modus und Form einer Abstimmung oder Wahl</h4>
    <p><br />
    Die Art des Mehrs kann mit diesem Ordnungsantrag nicht geändert werden.</p>
    <h4 id='wiederholung-einer-abstimmung-oder-wahl'>Wiederholung einer Abstimmung oder Wahl</h4>
    <p><br />
    Dieser Ordnungsantrag muss direkt anschliessend an die anzufechtende Abstimmung oder Wahl erfolgen. Eine Abstimmung oder Wahl kann nur einmal wiederholt werden, ausser es können Verfahrensfehler geltend gemacht werden.</p>
    <h4 id='rückkommen-auf-ein-abgeschlossenes-traktandum'>Rückkommen auf ein abgeschlossenes Traktandum</h4>
    <p><br />
    Es kommen nur Geschäfte der aktuellen GV in Frage, die Genehmigung der Traktandenliste ist davon ausgeschlossen.</p>
    <h4 id='rückweisen-von-geschäften-an-den-antragsteller'>Rückweisen von Geschäften an den Antragsteller</h4>
    <p><br />
    Bei Annahme wird nicht über das Geschäft abgestimmt. Das Geschäft ist damit weder angenommen noch abgelehnt.</p>
    <h4 id='unterbruch-der-sitzung'>Unterbruch der Sitzung</h4>
    <p><br />
    Zusammen mit dem Ordnungsantrag muss eine Zeitspanne angegeben werden, für wie lange die Sitzung unterbrochen werden soll. Eine Vertagung der Sitzung ist mit diesem Ordnungsantrag nicht möglich.</p>
    <h4 id='wegweisung-eines-anwesenden'>Wegweisung eines Anwesenden</h4>
    <p><br />
    Der Betroffene muss die Generalversammlung verlassen.</p>
    <h1 id='budget' class='unnumbered'>Budget</h1>
    <h4 id='zeitlicher-ablauf'>Zeitlicher Ablauf</h4>
    <p><br />
    ’0 Jeweils im Herbstsemester ist von der GV das Budget für das kommende Jahr festzulegen. Dieses kann im Verlauf der Budgetperiode von folgenden GVs mittels Änderungsanträgen angepasst werden. Es gelten die Fristen gemäss [Antragsfristen] der Statuten.<span><br />
    </span>’S Die Abrechnung der vergangenen Rechnungsperiode (Erfolgsrechnung, Bilanz und Gegenüberstellung mit dem Budget) ist jeweils im Frühjahrssemester zu präsentieren und zu genehmigen. Der Vorstand hat an der GV im Herbstsemester zudem eine vorläufige Abrechnung der laufenden Rechnungsperiode vorzulegen.</p>
    <h4 id='allgemeines'>Allgemeines</h4>
    <p><br />
    ’0 Das an der Herbstsemester-GV zu genehmigende Budget für die nächste Rechnungsperiode hat im allgemeinen dem provisorischen Budget (publiziert mit der Ankündigung der GV) zu entsprechen. Die Mitglieder können zu jedem einzelnen Posten Änderungsanträge stellen. <span><br />
    </span>’S Ein Budgetposten kann an eine verantwortliche Person gebunden werden, der Vorstand verfügt über die nicht personengebundenen Budgetposten. <span><br />
    </span>’S Über das Budget wird am Ende aber im Ganzen abgestimmt. Sobald das Budget insgesamt genehmigt ist, sind keine weiteren Budget-Anträge mehr möglich.</p>
    <h4 id='provisorisches-budget'>Provisorisches Budget</h4>
    <p><br />
    Über Abweichungen (neue oder geänderte Posten und Beträge) gegenüber dem provisorischen Budget muss der Sitzungsleiter explizit informieren. Sollte ein solcher Budgetposten einen Gesamtaufwand von 3000.- CHF übersteigen, muss dieser Änderungsantrag zum provisorischen Budget zwingend der GV vorgelegt werden.</p>
    <h1 id='abstimmungen-und-wahlen' class='unnumbered'>Abstimmungen und Wahlen</h1>
    <h4 id='abstimmungs--und-wahlmodi'>Abstimmungs- und Wahlmodi</h4>
    <p><br />
    ’0 Die Stimmabgabe erfolgt durch Handaufheben. Auf Antrag eines Mitglieds sind einzelne Abstimmungen geheim vorzunehmen. <span><br />
    </span>’S Sofern die Statuten keinen anderen Modus vorsehen, gelten folgende Regeln:</p>
    <ol type='a'>
    <li><p>Allgemeine Beschlüsse werden durch das absolute Mehr aller anwesenden Stimmberechtigten gefällt</p></li>
    <li><p>Bei inkompatiblen Anträgen und Änderungsanträgen wird zunächst über jeden separat abgestimmt</p></li>
    <li><p>Das Ausmehren angenommener inkompatibler Anträge und Änderungsanträge gegeneinander unterliegt dem relativen Mehr</p></li>
    </ol>
    <h4 id='wahl-der-vereinsorgane'>Wahl der Vereinsorgane</h4>
    <p><br />
    Präsident und Quästor werden jeweils einzeln gewählt. Die Wahl der übrigen Vereinsorgane erfolgt jeweils im Block und mit absolutem Mehr der Stimmen. Auf Antrag eines Mitglieds können Einzelwahlen erfolgen.</p>
    <h4 id='präsidium-und-quästor'>Präsidium und Quästor</h4>
    <p><br />
    Die Wahl des Präsidenten und des Quästors erfolgt im ersten Wahlgang mit Zweidrittelmehrheit aller abgegebenen Stimmen. Im zweiten Wahlgang entscheidet das relative Mehr zwischen den zwei Kandidaten, die im ersten Wahlgang am meisten Stimmen erhalten haben.</p>
    <h1 id='anhang-b-finanzreglement-des-amiv' class='unnumbered'>Anhang B:<br />
    Finanzreglement des AMIV</h1>
    <h1 id='grundsätze' class='unnumbered'>Grundsätze</h1>
    <h4 id='einleitung'>Einleitung</h4>
    <p><br />
    Das Finanzreglement setzt die Finanzkompetenzen der einzelnen ausführenden Organe und Kommissionen des AMIV fest. Als Basis für alle in diesem Reglement definierten Vorgänge gilt das von der Generalversammlung genehmigte Budget. Es setzt insbesondere die Rechte, Pflichten und Kompetenzen der Quästoren und Finanzverantwortlichen des AMIV und der Kommissionen fest.</p>
    <h4 id='rechnungsperiode'>Rechnungsperiode</h4>
    <p><br />
    Die Budget- und Rechnungsperiode für den AMIV und alle seine Kommissionen ist das Kalenderjahr. Der im folgenden als steuerrelevante Periode verwendete Begriff orientiert sich jeweils an der für die jeweilige Steuer gesetzlich vorgesehenen Abrechnungsfrist.</p>
    <h4 id='allgemeine-bestimmungen-und-zeichnungsberechtigung-auf-konten'>Allgemeine Bestimmungen und Zeichnungsberechtigung auf Konten</h4>
    <p><br />
    ’0 Der von der GV gewählte Präsident und Quästor des AMIV besitzen Einzelzeichnungsrecht auf sämtliche Vereinskonten.<span><br />
    </span>’S Präsidenten und Quästoren von Kommissionen mit eigener Rechnungsführung haben Einzelzeichnungsrecht auf den für die Kommission relevanten Vereinskonten.<span><br />
    </span>’S Präsidenten und Finanzverantwortliche von Kommissionen ohne eigene Rechnungsführung haben auf Wunsch Kollektivzeichnungsrecht auf den für die Kommission relevanten Vereinskonten. Sämtliche Transaktionen müssen durch den Präsidenten oder den Quästor des AMIV gegengezeichnet werden.<span><br />
    </span>’S Zusätzliche Kollektiv-Zeichnungsberechtigungen auf Konten sind durch Vorstandsbeschluss möglich.<span><br />
    </span>’S Für einzelne Geschäfte kann einem Mitglied des Vorstands durch Beschluss der Vorstandssitzung die Zeichnungsberechtigung für einzelne Geschäfte gewährt werden.</p>
    <h4 id='pflichten-des-amiv-quästors'>Pflichten des AMIV Quästors</h4>
    <p><br />
    ’0 Der Quästor ist für die Buchführung des AMIV und der Kommissionen ohne eigene Rechnungsführung verantwortlich, stellt den Eingang der Debitoren sicher und verwaltet die Mittel des AMIV. Er hat sich an die allgemein gültigen und gesetzlichen Vorschriften für die doppelte Buchführung zu halten.<span><br />
    </span>’S Jeweils zum Ende einer steuerrelevanten Periode ist die Rechnung von Kommissionen mit eigener Rechnungsführung zu revidieren und für die Steuerdeklaration mit der Gesamtrechnung des AMIV zu konsolidieren.<span><br />
    </span>’S Zum Ende der Rechnungsperiode ist die Vereinsrechnung abzuschliessen und die Bilanz inklusive der Kommissionen mit eigener Rechnungsführung aufzustellen.<span><br />
    </span>’S Des weiteren ist er für die Einhaltung der gesetzlichen Aufbewahrungspflichten für die Buchhaltung verantwortlich.</p>
    <h4 id='pflichten-der-kommissionen-und-der-kommissionsquästoren'>Pflichten der Kommissionen und der Kommissionsquästoren</h4>
    <p><br />
    Es gelten folgende Bestimmungen: <span><br />
    </span>’0 Die Kommissionen haben frühzeitig vor einer GV ein Budget für die folgende Rechnungsperiode beim Vorstand einzureichen, welches nach Prüfung durch den Vorstand in das Gesamtbudget zu integrieren ist.<span><br />
    </span>’S Unaufgeschlüsselte Sammelbuchungen oder Verrechnungen dürfen nicht vorgenommen werden.<span><br />
    </span>’S Für jeden einzelnen Geschäftsvorfall ist ein Beleg zu erstellen. Die Belege sind zu nummerieren und mit Buchungssatz zu versehen.</p>
    <h1 id='kommissionen-ohne-eigene-rechnungsführung' class='unnumbered'>Kommissionen ohne eigene Rechnungsführung</h1>
    <h4 id='grundsätze-1'>Grundsätze</h4>
    <p><br />
    Kommissionen haben grundsätzlich keine eigene Rechnungsführung. Diese wird in der Hauptbuchhaltung durch den Quästor des AMIV getätigt. Kommissionspräsidenten und Finanzverantwortliche (wenn vorhanden) können auf Wunsch Einblick in die Buchhaltung erhalten um die Rechnung der Kommission zu kontrollieren und Rechnungen im Namen der Kommission stellen zu können.</p>
    <h4 id='bankkonten'>Bankkonten</h4>
    <p><br />
    Die Zahlungsabwicklung von Kommissionen wird grundsätzlich über den AMIV-Quästor und das Hauptkonto des AMIV abgewickelt. In begründeten Fällen kann Kommissionen durch Vorstandsbeschluss ein eigenes Konto erlaubt werden.</p>
    <h4 id='eigenkapital'>Eigenkapital</h4>
    <p><br />
    ’0 Von der GV Kommissionen zugesprochenes Budget verfällt automatisch zum Ende der Rechnungsperiode. Auf begründeten Antrag beim Vorstand kann nicht benötigtes Budget zum Ende der Rechnungsperiode in Kapital der Kommission umgewandelt werden. Dieses wird als Unterkonto des gesamten Eigenkapitals des AMIV geführt. Der Antrag ist vor Ablauf der betroffenen Rechnungsperiode zu stellen.<span><br />
    </span>’S Überzieht eine Kommission ihr Budget, wird die Differenz vom Eigenkapital der Kommission abgezogen. Veränderungen am Kapital von Kommissionen müssen der GV zur Information vorgelegt werden.</p>
    <h1 id='kommissionen-mit-eigener-rechnungsführung' class='unnumbered'>Kommissionen mit eigener Rechnungsführung</h1>
    <h4 id='antrag-auf-eigene-rechnungsführung'>Antrag auf eigene Rechnungsführung</h4>
    <p><br />
    ’0 Kommissionen können durch Beschluss der GV eine eigene Rechnungsführung erhalten. Dies kann durch den Kommissionspräsidenten oder den AMIV-Quästor beantragt werden. Ebenfalls können die erwähnten Personen beantragen, dass die Rechnung einer Kommission wieder durch den AMIV-Quästor geführt wird. Beide Arten von Anträgen müssen zehn Tage vor der GV dem Vorstand schriftlich vorgelegt und begründet werden. Bei Neugründung von Kommissionen kann eine eigene Rechnungsführung auch direkt an der GV beantragt werden. Beschlossene Änderungen bezüglich der Rechnungsführung treten jeweils zum Ende der Rechnungsperiode in Kraft.<span><br />
    </span>’S Der AMIV-Quästor und die Revisoren haben der GV zu jedem Antrag auf eigene oder zentrale Rechnungsführung eine Empfehlung zu dessen Annahme oder Ablehnung vorzulegen.</p>
    <h4 id='Grundsaetze_Rechnung_Kommissionen'>Grundsätze der Rechnungsführung für Kommissionen</h4>
    <p><br />
    Die Rechnungsführung hat nach den allgemein gültigen, gesetzlichen buchhalterischen Vorschriften (doppelte Buchhaltung) und Vorgaben des AMIV-Quästors zu erfolgen. Dies betrifft insbesondere auch die zu verwendende Buchhaltungssoftware, Kontenplan, Belegaufbewahrung sowie sämtliche steuerrelevanten Vorgänge.</p>
    <h4 id='weitere-pflichten-eines-kommissionsquästors'>Weitere Pflichten eines Kommissionsquästors</h4>
    <p><br />
    Neben den in [Grundsaetze_Rechnung_Kommissionen] definierten Pflichten ist jeweils zum Ende einer steuerrelevanten Periode die Rechnung der Kommission abzuschliessen und dem Quästor des AMIV zur Zwischenrevision vorzulegen. Hierbei sind auch sämtliche Belege der vergangenen steuerrelevanten Periode geordnet an den Quästor des AMIV zu übergeben. Diese Regelung ist auch für die Deklaration der Mehrwertsteuern anzuwenden.</p>
    <h4 id='revision'>Revision</h4>
    <p><br />
    Die Rechnungen der Kommissionen mit eigener Rechnungsführung werden durch den Quästor des AMIV und die Revisoren geprüft.</p>
    `);
  },
};
