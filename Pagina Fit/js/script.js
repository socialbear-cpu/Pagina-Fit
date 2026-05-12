const form = document.querySelector("#avaliacaoForm");
const dialog = document.querySelector("#resumoDialog");
const resumoTexto = document.querySelector("#resumoTexto");
const fecharResumo = document.querySelector("#fecharResumo");
const imprimirResumo = document.querySelector("#imprimirResumo");

const labels = {
  nome_completo: "Nome completo",
  cpf: "CPF",
  rg: "RG",
  data_nascimento: "Data de nascimento",
  idade: "Idade",
  sexo: "Sexo",
  altura: "Altura",
  peso_atual: "Peso atual",
  telefone: "Telefone / WhatsApp",
  email: "E-mail",
  profissao: "Profissão",
  academia_treino: "Academia onde irá treinar",
  endereco: "Endereço",
  objetivo: "Objetivos",
  objetivo_outro: "Outro objetivo",
  ja_treinou: "Já treinou anteriormente",
  tempo_treino: "Tempo de treino",
  frequencia: "Frequência semanal",
  local_treino: "Local de treino",
  limitacoes_equipamentos: "Limitações de equipamentos",
  parq_1: "PAR-Q 1",
  parq_2: "PAR-Q 2",
  parq_3: "PAR-Q 3",
  parq_4: "PAR-Q 4",
  parq_5: "PAR-Q 5",
  parq_6: "PAR-Q 6",
  parq_7: "PAR-Q 7",
  doencas: "Doenças diagnosticadas",
  cirurgias: "Cirurgias prévias",
  lesoes: "Lesões / dores recorrentes",
  medicamentos: "Medicamentos contínuos",
  alergias: "Alergias / restrições",
  sono: "Qualidade do sono",
  estresse: "Nível de estresse",
  agua: "Ingestão hídrica diária",
  rotina_trabalho: "Rotina de trabalho",
  atividade_diaria: "Nível de atividade diária",
  exame: "Exame anexado",
  outros_exames: "Outros exames relevantes",
  foto_frontal: "Foto frontal",
  foto_perfil_direito: "Foto perfil direito",
  foto_perfil_esquerdo: "Foto perfil esquerdo",
  foto_posterior: "Foto posterior",
  medida_peso: "Medida - Peso",
  medida_altura: "Medida - Altura",
  cintura: "Cintura",
  abdomen: "Abdômen",
  quadril: "Quadril",
  coxa: "Coxa D/E",
  braco: "Braço D/E",
  antebraco: "Antebraço D/E",
  panturrilha: "Panturrilha D/E",
  preferencias: "Preferências de treino",
  restricoes: "Restrições específicas",
  meta: "Meta de prazo / evento",
  assinatura: "Assinatura",
  data_assinatura: "Data",
  aceite: "Aceite do termo"
};

function getFieldValue(field) {
  if (field.type === "checkbox") {
    if (field.name === "objetivo") {
      const selected = [...form.querySelectorAll('input[name="objetivo"]:checked')];
      return selected.map((item) => item.value).join(", ");
    }

    return field.checked ? "Sim" : "";
  }

  if (field.type === "radio") {
    const checked = form.querySelector(`input[name="${field.name}"]:checked`);
    return checked ? checked.value : "";
  }

  if (field.type === "file") {
    return field.files.length ? [...field.files].map((file) => file.name).join(", ") : "";
  }

  return field.value.trim();
}

function buildSummary() {
  const usedNames = new Set();
  const lines = ["AVALIAÇÃO FÍSICA A DISTÂNCIA", ""];

  [...form.elements].forEach((field) => {
    if (!field.name || usedNames.has(field.name)) {
      return;
    }

    usedNames.add(field.name);
    const value = getFieldValue(field);

    if (value) {
      lines.push(`${labels[field.name] || field.name}: ${value}`);
    }
  });

  return lines.join("\n");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.reportValidity()) {
    return;
  }

  resumoTexto.textContent = buildSummary();
  dialog.showModal();
});

fecharResumo.addEventListener("click", () => {
  dialog.close();
});

imprimirResumo.addEventListener("click", () => {
  window.print();
});
