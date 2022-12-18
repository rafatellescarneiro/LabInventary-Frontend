import { defineRule } from 'vee-validate'

export default {
        required: defineRule('required', value => {
            if (!value) {
                return 'Campo obrigatório.'
            }
            return true
        }),
        // Verifica se está no formato XX9999-999
        patrimonycheck: defineRule('patrimonycheck', value => {
            let regexp = /^[A-Z]{1}[A-Z]{1}[0-9]{4}-[0-9]{3}$/
            if (!regexp.test(value)) {
                return 'Código inválido.'
            }
            return true
        }),
        // Verifica se está no formato 9999,99
        pricecheck: defineRule('pricecheck', value => {
            let regexp = /^[0-9]{1,},[0-9]{2}$/
            if (!regexp.test(value)) {
                return 'Valor inválido.'
            }
            return true
        }),
         // Verifica se está no formato 9999,99
         positivocheck: defineRule('positivocheck', value => {
            if (parseFloat(value.replace(',','.')) <= 0) {
                return 'Valor não pode ser menor ou igual a zero'
                
            }
            return true
        }),
        imagemcheck: defineRule('imagemcheck', imagem => {
            // Valida o formato da URL
            let regex = new RegExp(/[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/);
            
            if (imagem == null) {
                return false
            }

            if (regex.test(imagem.name) == true) {
                return true;
            } else {
                return "Imágem inválida";
            }
        })
}