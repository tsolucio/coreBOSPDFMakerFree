<?php
$xx1d="\150t\155\154\x5f\145\156\x74\151\x74\x79\137\x64\x65\x63\x6f\144e"; 
$xx0b="\x61d\142";$xx0c="si\164\145\x5fU\122L";$xx0d="\x74\150\x69\163";$xx0e="r\145t\165rn\137i\x64";$xx0f="\166\x74i\x67er\x5fc\x75\x72\x72\145\156t\x5fve\x72\163\151\157n";require_once("m\157dul\x65\163\057PD\x46\115a\153\x65r\x2f\111nv\145\x6et\157r\171P\104\106\x2e\x70\x68p");include("\x6d\157\144\165\x6ces\x2f\120\x44F\x4d\141\153\x65\162/mp\x64\146\x2f\x6dp\x64\146\x2ep\x68\x70");$xx10 = $_REQUEST["r\x65cor\x64"];$xx11 = getSalesEntityType($xx10); $xx12 = CRMEntity::getInstance($xx11);if(isset($xx10)) {$xx12->retrieve_entity_info($xx10,$xx11);$xx12->id = $xx10;} if ($xx11 == "\x49\x6e\x76\157\151\143\x65") $xx13 = "\061";elseif ($xx11 == "S\141\154\x65s\117r\x64\145\x72") $xx13 = "\x32";elseif ($xx11 == "Pu\x72\x63\x68\141s\x65O\x72\144\145r") $xx13 = "\x33";elseif ($xx11 == "\x51\x75ot\x65\163") $xx13 = "\x34";else $xx13 = "";if ($xx13 != ""){$xx14 = $xx11."\x5f".$xx10; $xx15 = new PDFContent($xx13, $xx11, $xx12, $_REQUEST["la\156g\x75\141g\145"]); $xx16 = $xx15->getContent(); $xx17 = $xx15->getSettings(); $xx18 = $xx1d($xx16["hea\144\145\162"],ENT_COMPAT,"u\164\x66\x2d\x38"); $xx19 = $xx1d($xx16["\142\x6f\144\171"],ENT_COMPAT,"utf\055\070"); $xx1a = $xx1d($xx16["\146\x6f\157t\x65\x72"],ENT_COMPAT,"\165tf\x2d\x38"); if ($xx17["\157\162ie\x6et\x61t\151\157\156"] == "\154\x61nds\x63\x61pe")$xx1b = $xx17["fo\x72\x6d\x61t"]."\055\114"; else$xx1b = $xx17["f\157\162\x6d\x61\164"]; if (!isset($xx1c)) {$xx1c=new mPDF('',$xx1b,'','Arial',$xx17["\155\x61\x72\x67\x69n_\154\x65\x66t"],$xx17["\x6da\162\x67\151\156_r\x69\x67ht"],0,0,$xx17["m\x61\162\147\151\156\x5ft\x6f\x70"],$xx17["\x6d\x61\x72g\x69\x6e\x5f\142ottom"]);$xx1c->SetAutoFont(); @$xx1c->SetHTMLHeader($xx18); } else {@$xx1c->SetHTMLHeader($xx18);@$xx1c->WriteHTML('<pagebreak sheet-size="'.$xx1b.'" margin-left="'.$xx17["\x6da\162g\x69\x6e\x5f\x6c\x65\146\164"].'mm" margin-right="'.$xx17["\x6d\141\x72\x67\151\156\137r\151g\x68\164"].'mm" margin-top="0mm" margin-bottom="0mm" margin-header="'.$xx17["\155\x61\162\x67\151\x6e\137\164o\160"].'mm" margin-footer="'.$xx17["mar\147\x69\156\x5fbo\164t\x6f\155"].'mm" />'); } @$xx1c->SetHTMLFooter($xx1a); @$xx1c->WriteHTML($xx19); $xx1c->Output('storage/'.$xx14.'.pdf');}echo "\x3cs\143\162\x69\x70\x74>\x77i\156\x64\157\167\056\x68ist\x6f\162\171\056b\x61ck\x28);\074\057\x73\x63\162\x69\x70\164>";exit();
?>