

export const newTestData = {
  "name": "Реестр исследований",
  "items": [
    {
      "id": 45,
      "companyNameId": 125,
      "study": {
        "name": "исследование 13496.1-19",
        "description": "тестирование образцов"
      },

      "reagents": [
        {
          "id": 456,
          "table": "reagents",
          "name": "Азотная кислота",
          "reagentPurity": "чистый",
          "volume": 5,
          "reagentUnit": "мл"
        },
        {
          "id": 457,
          "table": "reagents",
          "name": "Ирридиий",
          "reagentPurity": "чистый",
          "volume": 12.3,
          "reagentUnit": "гр"
        },
        {
          "id": 99,
          "table": "gso",
          "name": "Магний",
          "reagentPurity": "",
          "volume": 12.3,
          "reagentUnit": ""
        }
      ]
    },
    {
      "id": 46,
      "companyNameId": 125,
      "study": {
        "name": "для градуировки ICP-EOS",
        "description": "работы по градуировке ICP-EOS"
      },
      "reagents": [
        {
          "id": 456,
          "table": "reagents",
          "name": "Азотная кислота",
          "reagentPurity": "чистый",
          "volume": 3.1,
          "reagentUnit": "мл"
        },
        {
          "id": 111,
          "table": "precursors",
          "name": "Бюкс лабораторный СН-60/14",
          "reagentPurity": "-",
          "volume": 12.3,
          "reagentUnit": "шт"
        }
      ]
    },
    {
      "id": 47,
      "companyNameId": 125,
      "study": {
        "name": "научная работа",
        "description": "научная работа Петров И.И."
      },
      "reagents": [
        {
          "id": 200,
          "table": "precursors",
          "name": "Кислота серная",
          "reagentPurity": "-",
          "volume": 0.03,
          "reagentUnit": "кг/л"
        }
      ]
    }
  ]
}
