const mongoose = require('mongoose');

class LivroDao{
    async criar(livro,res){
        const {titulo,autor,categoria,imagem,descricao,preco} = livro;
        const Livro = mongoose.model('livros');
        try{
            const inserir = await new Livro({
                titulo:titulo,
                autor:autor,
                categoria:categoria,
                imagem:imagem,
                descricao:descricao,
                preco:preco,
                status:true
            }).save();

            res.status(201).json({msg:"Livro Cadastrado Com Sucesso",id:inserir._id,titulo:inserir.titulo});
        }
        catch(error){
            res.status(401).json({msg:"Houve um erro ao cadastrar um livro",error:error});
        }
    }
    async listar(res){
        const Livro = mongoose.model('livros');
        try{
             //mostrando todos os livros
            const find = await Livro.find({status:true}).sort({titulo:1}).exec();
            res.status(202).json(find);
        }
        catch(error){
            res.status(400).json(error);
        }
    }
    async listarRecent(res){
        const Livro = mongoose.model('livros');
        try{
            //mostrando todos os livros
            const find = await Livro.find({status:true}).sort({_id:-1}).limit(4).exec();
            res.status(202).json(find);
        }
        catch(error){
            res.status(400).json(error);
        }
    }
    async precosBaixos(res){
        const Livro = mongoose.model('livros');
        try{
            //mostrando preços
            const find = await Livro.find({status:true}).sort({preco:1}).limit(4).exec();
            res.status(202).json(find);
        }
        catch(error){
            res.status(400).json(error);
        }
    }
    async contagemTotal(res){
        const Livro = mongoose.model('livros');
        try{
            //contagem
            const count = await Livro.count({}).exec();
            const countAtivos = await Livro.count({status:false}).exec();
            res.status(202).json({count:count,countDesactive:countAtivos});
        }
        catch(error){
            res.status(400).json(error);
        }
    }
    async listarTodos(res){
        const Livro = mongoose.model('livros');
        try{
            //mostrando todos os livros
            const find = await Livro.find({}).sort({titulo:1});
            res.status(202).json(find);
        }
        catch(error){
            res.status(400).json(error);
        }
    }
    listarCategorias(res){
        const categorias = [{categoria:"Fantasia"},{categoria:"Ficção"},{categoria:"Romance"},{categoria:"Poesia"},{categoria:"Biografia"},{categoria:"Humor"},{categoria:"Contos"},{categoria:"Saúde"},{categoria:"Música"},{categoria:"Fotografia"},{categoria:"Artes"}];
        res.status(200).json(categorias);
     
    }
    async buscarLivro(livro,res){
        const Livro = mongoose.model('livros');
        const pesquisa = livro; 
        try{
            //mostrando todos os livros
            const findLivro = await Livro.find({titulo : {$regex:pesquisa},status:true})
            res.status(202).json(findLivro);
        }
        catch(error){
            res.status(400).json(error);
        }
    }
    async atualizar(livro,res){
        const Livro = mongoose.model('livros');
        //dados p/ atualizar
        const update = {titulo:livro.titulo,status:livro.status ,autor:livro.autor,categoria:livro.categoria,imagem:livro.imagem,descricao:livro.descricao,preco:livro.preco}
        try{
            const atualiza = await Livro.updateOne({_id:livro._id},update).exec();
            res.status(201).json({msg:"Dados Do Livro Atualizado",result:atualiza,id:atualiza._id});
        }
        catch(error){
            res.status(400).json(error);
        }
    }
    async buscar(parametro,res){
        if(parametro.length == 24){
            const id = parametro;
            const Livro = mongoose.model('livros');
            try{
                //mostrando todos os livros
                const findId = await Livro.findOne({_id:id, status: true}).exec();
                res.status(202).json(findId);
            }
            catch(error){
                res.status(400).json(error);
            }
        }else{
            const categoria = parametro;
            const Livro = mongoose.model('livros');
            try{
                //mostrando todas as categorias
                const findCategory = await Livro.find( {"categoria":categoria,"status":true }).sort({categoria:1}).exec();
                res.status(202).json(findCategory);
            }
            catch(error){
                res.status(400).json(error);
            }
        }
    }
}
module.exports = new LivroDao;