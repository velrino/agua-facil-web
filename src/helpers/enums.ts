import { StorageService } from '../app/api/storage/storage.service';

const ENUMS = {
    links: {
        estados: 'https://gist.githubusercontent.com/letanure/3012978/raw/36fc21d9e2fc45c078e0e0e07cce3c81965db8f9/estados-cidades.json'
    },
    APIMessages: {
        apiFailed: "Falha na API",
        loginFailed: "",
    },
    Auth: function (index = 'token') {
        const data = StorageService.get('auth');
        if (data == null)
            return null;
        const obj = JSON.parse(data);
        return (obj[index]) ? obj[index] : null;
    },
    multiselectDropdownSettings: {
        singleSelection: false,
        idField: 'id',
        textField: 'text',
        selectAllText: 'Selecionar todos',
        unSelectAllText: 'Deselecionar todos',
        itemsShowLimit: 3,
        allowSearchFilter: true
    },
    payments: [
        { id: 1, text: 'Crédito' },
        { id: 2, text: 'Débito' },
        { id: 3, text: 'Dinheiro' },
    ],
    periods: [
        { id: 1, text: 'Manhã' },
        { id: 2, text: 'Tarde' },
        { id: 3, text: 'Noite' },
        { id: 4, text: 'Madrugada' },
    ]
}

export { ENUMS };