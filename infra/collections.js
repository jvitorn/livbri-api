class UsuarioCollection {

    init(connection,mongoose) {
        this.connection = connection;
        this.usuarioSchema(mongoose);
        this.livroSchema(mongoose);
    }
    livroSchema(mongoose){
        const Schema = mongoose.Schema;
        //model Livros
        const LivroSchema = new Schema({
            titulo:{
                type:String,
                require:true
            },
            autor:{
                type:String,
                require:true
            },
            categoria:{
                type:String,
                require:true
            },
            imagem:{
                type:String,
                require:true
            },
            descricao:{
                type:String,
                require:true
            },
            preco:{
                type:Number,
                require:true
            },
            status:{
                type:Boolean,
                require:true
            }            
        })
        
        //criando uma collection usando o Schema definido
        mongoose.model('livros',LivroSchema);
        LivroSchema.index({categoria:1});
        LivroSchema.index({autor:1});
        console.log('Livros Schema criado com Sucesso');
    }
    usuarioSchema(mongoose){
        //Model Usuarios
        const UsuarioSchema = mongoose.Schema({
            nome:{
                type:String,
                require:true
            },
            email:{
                type:String,
                require:true,
                index:  true,
                unique: true
            },
            senha:{
                type:String,
                require:true
            },
            nivel:{
                type:String,
                require:true
            }
        })
        UsuarioSchema.index( { email: 1 }, { unique: true } )
        //criando uma collection usando o schema definido
        mongoose.model('usuarios',UsuarioSchema);
        
        console.log('Usuarios Schema criado com Sucesso');
    }
}

module.exports = new UsuarioCollection;