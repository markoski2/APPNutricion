/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const cors = require('cors')({ origin: true });
const functions = require('firebase-functions');
const bcrypt = require('bcrypt');

const dotenv = require('dotenv');
dotenv.config();

const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.createHash('sha256').update(process.env.KEYCRYPTER).digest('base64').substr(0, 32);
const iv = Buffer.from(process.env.KEYIV, 'hex');
//const iv = crypto.randomBytes(16);  // Vector de inicialización de 128 bits  
//


const admin = require('firebase-admin');
admin.initializeApp();


exports.helloWorld = onRequest((request, response) => {
  cors(request, response, async () => {



  })
});

async function Encrypter(Text) {
  const hashed = await bcrypt.hash(Text, 10);
  return hashed
}
async function EncrypterAES(Text, DateIv) {
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), DateIv);
  let encrypted = cipher.update(Text, "utf8");
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return DateIv.toString('hex') + ':' + encrypted.toString('hex');
}
async function DesEncrypterAES(Text) {
  try {
    let textParts = Text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(":"), 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString("utf8");
  } catch (error) {
    return "sdsd";
  }



}
exports.CreateUser = onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      res.status(405).send('Método no permitido');
      return;
    }

    try {
      const User = req.body; // Aquí se esperan los datos directamente
      // Validar datos de entrada
      if (!User.IdUser || !User.IdClient || !User.User || !User.Password) {
        res.status(400).send('Datos de usuario incompletos');
        return;
      }
      const db = admin.firestore();
      let IvTemporal = crypto.randomBytes(16);
      let UserDates = {
        IdUser: await EncrypterAES((User.IdUser).toString(), iv),
        IdClient: await EncrypterAES((User.IdClient).toString(), IvTemporal),
        User: await EncrypterAES((User.User).toString(), iv),
        Password: await Encrypter(User.Password),
        iv: IvTemporal,
        Rol: "/homeClient"
      }

      await db.collection('User').doc(UserDates.IdUser).set({
        IdUser: UserDates.IdUser,
        IdClient: UserDates.IdClient,
        User: UserDates.User,
        Password: UserDates.Password,
        Iv: UserDates.iv,
        Rol: UserDates.Rol
      });

      res.status(200).json({Flag:true});
      return
    } catch (error) {
      console.error('Error creando usuario:', error);
      res.status(500).json({Flag:false});
    }
  });
})
//GETS
exports.GetUser = onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      res.status(405).json({Flag:false});
      return;
    }
    try {
      const bd = admin.firestore()
      const User = req.body
      if (!User.User || !User.Password) {
        res.status(400).json({Flag:false});
        return;
      }

      const UserName = await EncrypterAES(User.User, iv)

      const UserDate = await bd.collection('User').where('User', '==', UserName).get()
      if (UserDate.empty) {
        res.status(400).send('Usuario No Encontrado')
        return;
      }
      let ValueUser
      UserDate.forEach(doc => {
        ValueUser = doc.data()
      })
      const VerifyPass = await bcrypt.compare(User.Password, ValueUser.Password)
      if (VerifyPass) {
        return res.status(200).json(ValueUser);
      } else {
        res.status(400).send('contraseña equivocada')
        return;
      }

    } catch (error) {

    }
  })
})
exports.GetClients = onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "GET") {
      res.status(400).json({Flag:false});
      return;
    }

    try {
      const dbfirestore = admin.firestore()
      const InformationClients = await dbfirestore.collection("Clients").get()
      let NewArray = []

      if (InformationClients.empty) {
        res.status(405).json({Flag:false});
        return
      }

      InformationClients.forEach(async doc => {
        NewArray.push(doc.data())
      })

      for (let Element of NewArray) {
        Element.IdClient = await DesEncrypterAES(Element.IdClient)
        Element.IdUser = await DesEncrypterAES(Element.IdUser)
        Element.IdClientInformation = await DesEncrypterAES(Element.IdClientInformation)
        Element.Name = await DesEncrypterAES(Element.Name)
        Element.LastName = await DesEncrypterAES(Element.LastName)
        Element.Phone = await DesEncrypterAES(Element.Phone)
      }

      return res.status(200).json(NewArray);

    } catch (error) {
      res.status(400).json({Flag:false});
      return
    }


  })
});
exports.GetClient = onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      res.status(400).send("Metodo inccorrecto");
      return;
    }

    try {
      const dbfirestore = admin.firestore();
      const Id = req.body;
      const DocId = EncrypterAES((Id.Id).toString(), iv);
      const InformationClient = await dbfirestore.collection("Clients").doc(DocId).get();


      if (InformationClient.empty) {
        res.status(405).json({Flag:false});
        return
      }
      let NewArray;
      InformationClient.forEach(doc => {
        NewArray = doc.data();
      });

      return res.status(200).json(NewArray);

    } catch (error) {
      res.status(410).send(error)
      return
    }


  })
});
exports.GetExtraInforamtionClient = onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      res.status(400).send("Metodo inccorrecto");
      return;
    }
    
    try {
      const dbfirestore = admin.firestore();
      const Id = req.body;
      const DocId = await EncrypterAES((Id.Id).toString(), iv);
      const InformationClient = await dbfirestore.collection("ClientInformation").doc(DocId).get();

      if (InformationClient.empty) {
        res.status(405).json({Flag:false});
        return
      }
      let NewArray;
      NewArray=InformationClient.data()
/*
      for(let Element of InformationClient){
        NewArray=Element.data()
      }

      InformationClient.forEach(doc => {
        NewArray=doc.data()
      });*/

      return res.status(200).json(NewArray);

    } catch (error) {
      res.status(400).send(error)
      return
    }


  })
});
exports.GetRecipes = onRequest((req, res) => {
  let ArrayNone = {}
  cors(req, res, async () => {
    if (req.method !== "GET") {
      res.status(400).send("Metodo inccorrecto");
      return;
    }

    try {
      const dbfirestore = admin.firestore()
      const InformationClients = await dbfirestore.collection("Recipes").get()
      let NewArray = []

      if (InformationClients.empty) {
        return res.status(200).json({Flag:false});
      }

      InformationClients.forEach(doc => {
        NewArray.push(doc.data())
      })

      return res.status(200).json(NewArray)

    } catch (error) {
      res.status(410).send(error)
      return
    }


  })
});
exports.GetMenu = onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      res.status(400).send("Metodo inccorrecto");
      return;
    }

    try {
      const dbfirestore = admin.firestore();
      const Id = req.body;
      let IdMenu;
      let InformationClient;
      let NewArray=[];
      for(let Element of Id){
        IdMenu = await EncrypterAES((Element).toString(), iv);
        InformationClient = await dbfirestore.collection("Menus").doc(IdMenu).get();
        NewArray.push(InformationClient.data())
      }
      //const DocId = await EncrypterAES((Id.Id).toString(), iv);
      //const InformationClient = await dbfirestore.collection("Menus").doc(DocId).get();


      if (NewArray.empty) {
        res.status(405).json({Flag:false});
        return
      }
      //let NewArray;
      /*InformationClient.forEach(doc => {
        NewArray = doc.data();
      });*/

      //NewArray = InformationClient.data();

      return res.status(200).json(NewArray);

    } catch (error) {
      res.status(410).send(error)
      return
    }


  })
});
exports.GetMenus = onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      res.status(400).send("Metodo inccorrecto");
      return;
    }

    try {
      const dbfirestore = admin.firestore();
      const Id = req.body;
      const InformationClient = await dbfirestore.collection("Menus").get();


      if (InformationClient.empty) {
        res.status(405).json({Flag:false});
        return
      }
      let NewArray = [];
      InformationClient.forEach(doc => {
        NewArray.push(doc.data());
      });

      return res.status(200).json(NewArray);

    } catch (error) {
      res.status(410).send(error)
      return
    }


  })
});
//ADD
exports.AddInformationClient = onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      res.status(405).send('Método no permitido');
      return;
    }

    try {
      const User = req.body; // Aquí se esperan los datos directamente
      // Validar datos de entrada
      if (!User.IdClient || !User.IdUser || !User.IdClientInformation) {
        res.status(400).send('Datos de usuario incompletos');
        return;
      }
      if (!User.Name || !User.LastName || !User.Phone) {
        res.status(400).send('Incomplete Personal Information');
        return;
      }

      const db = admin.firestore();
      let IvTemporal = crypto.randomBytes(16);

      let InformationClient = {
        IdClient: await EncrypterAES(User.IdClient, iv),
        IdUser: await EncrypterAES(User.IdUser, iv),
        IdClientInformation: await EncrypterAES(User.IdClientInformation, iv),
        Name: await EncrypterAES(User.Name, IvTemporal),
        LastName: await EncrypterAES(User.LastName, IvTemporal),
        Phone: await EncrypterAES(User.Phone, IvTemporal),
        NextDate: User.NextDate,
        NextHours: User.NextHours,
        Console: IvTemporal,
        Menus: {
          Monday: User.Menus.Monday,
          Tuesday: User.Menus.Tuesday,
          Wednesday: User.Menus.Wednesday,
          Thursday: User.Menus.Thursday,
          Friday: User.Menus.Friday,
          Saturday: User.Menus.Saturday,
          Sunday: User.Menus.Sunday,
        }
      }
      await db.collection('Clients').doc(InformationClient.IdClient).set({
        IdClient: InformationClient.IdClient,
        IdUser: InformationClient.IdUser,
        IdClientInformation: InformationClient.IdClientInformation,
        Name: InformationClient.Name,
        LastName: InformationClient.LastName,
        Phone: InformationClient.Phone,
        NextDate: InformationClient.NextDate,
        NextHours: InformationClient.NextHours,
        Console: InformationClient.Console,
        Menus: {
          Monday: InformationClient.Menus.Monday,
          Tuesday: InformationClient.Menus.Tuesday,
          Wednesday: InformationClient.Menus.Wednesday,
          Thursday: InformationClient.Menus.Thursday,
          Friday: InformationClient.Menus.Friday,
          Saturday: InformationClient.Menus.Saturday,
          Sunday: InformationClient.Menus.Sunday,
        }
      });

      res.status(200).json({Flag:true});
    } catch (error) {
      console.error('Error creando usuario:', error);
      res.status(500).json({Flag:false});
    }
  });
})
exports.AddExtraInformationClient = onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      res.status(405).send('Método no permitido');
      return;
    }

    try {
      const ExtraInformation = req.body; // Aquí se esperan los datos directamente
      // Validar datos de entrada
      if (!ExtraInformation.TargetWeight || !ExtraInformation.ActualWeight || !ExtraInformation.Height) {
        res.status(400).send('Datos de usuario incompletos');
        return;
      }
      if (!ExtraInformation.Waist || !ExtraInformation.Hip || !ExtraInformation.Arms || !ExtraInformation.Chest || !ExtraInformation.Thigh) {
        res.status(400).send('Incomplete Personal Information');
        return;
      }
      const db = admin.firestore();
      let InformationClient = {
        IdClientInformation: await EncrypterAES((ExtraInformation.IdClientInformation).toString(), iv),
        IdClient: await EncrypterAES((ExtraInformation.IdClient).toString(), iv),
        TargetWeight: ExtraInformation.TargetWeight,
        ActualWeight: ExtraInformation.ActualWeight,
        Height: ExtraInformation.Height,
        Waist: ExtraInformation.Waist,
        Hip: ExtraInformation.Hip,
        Arms: ExtraInformation.Arms,
        Chest: ExtraInformation.Chest,
        Thigh: ExtraInformation.Thigh,
        Weights: {
          StarWeight: ExtraInformation.Weights.StarWeight,
          Weight3: ExtraInformation.Weights.Weight3,
          Weight2: ExtraInformation.Weights.Weight2,
          Weight1: ExtraInformation.Weights.Weight1,
          LastWeight: ExtraInformation.Weights.LastWeight,
          DateStar:ExtraInformation.Weights.DateStar,
          Date3:ExtraInformation.Weights.Date3,
          Date2:ExtraInformation.Weights.Date2,
          Date1:ExtraInformation.Weights.Date1,
          DateLast:ExtraInformation.Weights.DateLast
        }
      }

      await db.collection('ClientInformation').doc(InformationClient.IdClientInformation).set({
        IdClientInformation: InformationClient.IdClientInformation,
        IdClient: InformationClient.IdClient,
        TargetWeight: InformationClient.TargetWeight,
        ActualWeight: InformationClient.ActualWeight,
        Height: InformationClient.Height,
        Waist: InformationClient.Waist,
        Hip: InformationClient.Hip,
        Arms: InformationClient.Arms,
        Chest: InformationClient.Chest,
        Thigh: InformationClient.Thigh,
        Weights: {
          StarWeight: InformationClient.Weights.StarWeight,
          Weight3: InformationClient.Weights.Weight3,
          Weight2: InformationClient.Weights.Weight2,
          Weight1: InformationClient.Weights.Weight1,
          LastWeight: InformationClient.Weights.LastWeight,
          DateStar:InformationClient.Weights.DateStar,
          Date3:InformationClient.Weights.Date3,
          Date2:InformationClient.Weights.Date2,
          Date1:InformationClient.Weights.Date1,
          DateLast:InformationClient.Weights.DateLast
        }
      });

      res.status(200).json({Flag:true});
      return
    } catch (error) {
      console.error('Error creando usuario:', error);
      res.status(500).json({Flag:false});
    }
  });
})
exports.AddNewRecipe = onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      res.status(405).send('Método no permitido');
      return;
    }

    try {
      const InformationRecipe = req.body; // Aquí se esperan los datos directamente
      // Validar datos de entrada
      if (!InformationRecipe.Name || !InformationRecipe.Ingredinets || !InformationRecipe.Procedure) {
        res.status(400).send('Datos de usuario incompletos');
        return;
      }
      if (!InformationRecipe.Carbohydrate || !InformationRecipe.Fat || !InformationRecipe.Protein) {
        res.status(400).send('Incomplete Personal Information');
        return;
      }
      const db = admin.firestore();
      let Recipe = {
        IdRecipes: await EncrypterAES((InformationRecipe.IdRecipes).toString(), iv),
        Name: InformationRecipe.Name,
        Ingredinets: InformationRecipe.Ingredinets,
        Procedure: InformationRecipe.Procedure,
        Carbohydrate: InformationRecipe.Carbohydrate,
        Fat: InformationRecipe.Fat,
        Protein: InformationRecipe.Protein
      }

      await db.collection('Recipes').doc(Recipe.IdRecipes).set({
        IdRecipes: Recipe.IdRecipes,
        Name: Recipe.Name,
        Ingredinets: Recipe.Ingredinets,
        Procedure: Recipe.Procedure,
        Carbohydrate: Recipe.Carbohydrate,
        Fat: Recipe.Fat,
        Protein: Recipe.Protein
      });

      res.status(200).json({ Res: true })
    } catch (error) {
      console.error('Error creando Receta:', error);
      res.status(500).send('Error en el servidor');
    }
  });
})
exports.AddMenu = onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      res.status(405).send('Método no permitido');
      return;
    }

    try {
      const InformationMenu = req.body; // Aquí se esperan los datos directamente
      // Validar datos de entrada
      const db = admin.firestore();
      for (let Element of InformationMenu) {
        Element.IdMenu = await EncrypterAES((Element.IdMenu).toString(), iv)

        await db.collection('Menus').doc(Element.IdMenu).set({
          IdMenu: Element.IdMenu,
          Breakfast: Element.Breakfast,
          Lunch: Element.Lunch,
          Meal: Element.Meal,
          Snack: Element.Snack,
          Dinner: Element.Dinner,
          Refreshment: Element.Refreshment
        });
      }
      res.status(200).json({flag:true});
    } catch (error) {
      console.error('Error creando Menu:', error);
      res.status(500).send('Error en el servidor');
    }
  });
})
//Update
exports.UpdateMenu = onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      res.status(400).send("Metodo incorrecto");
      return;
    }
    try {
      let Information = req.body

      if (!Information.Id || !Information.Parameter || !Information.Value) {
        res.status(400).send("Datos incompletos");
        return;
      }
      let UpdateDate = {};
      UpdateDate[Information.Parameter] = Information.Value;

      let bd = admin.firestore()

      let IdEncripter =await EncrypterAES((Information.Id).toString(), iv)
      await bd.collection('Menus').doc(IdEncripter).update(UpdateDate)
      res.status(200).json({Flag:true})
    } catch (error) {
      req.status(400).send(error)
    }
  })
})
exports.UpdateMenuClient = onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      res.status(400).send("Metodo incorrecto");
      return;
    }
    try {
      let Information = req.body

      let bd = admin.firestore()
      let IdEncripter = await EncrypterAES((Information.Id).toString(), iv)
      await bd.collection('Clients').doc(IdEncripter).update({
        Menus: {
          Friday: Information.Friday,
          Monday: Information.Monday,
          Saturday: Information.Saturday,
          Sunday: Information.Sunday,
          Thursday: Information.Thursday,
          Tuesday: Information.Tuesday,
          Wednesday: Information.Wednesday
        }
      })
      res.status(200).json({ResFlag:true})
    } catch (error) {
      res.status(400).send(error)
    }
  })
})
exports.UpdateRecipe = onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      res.status(400).send("Metodo incorrecto");
      return;
    }
    try {
      let InformationRecipe = req.body

      //let IdEncripter =await EncrypterAES((InformationRecipe.Id).toString(), iv)

      let bd = admin.firestore()
      await bd.collection('Recipes').doc(InformationRecipe.Id).update({
        Carbohydrate: InformationRecipe.Carbohydrate,
        Name: InformationRecipe.Name,
        Fat: InformationRecipe.Fat,
        Ingredinets: InformationRecipe.Ingredinets,
        Procedure: InformationRecipe.Procedure,
        Protein: InformationRecipe.Protein
      })
      res.status(200).json({Flag:true})
    } catch (error) {
      req.status(400).send(error)
    }
  })
})
exports.UpdateInformationClient = onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      res.status(400).send("Metodo incorrecto");
      return;
    }
    try {
      let InformationRecipe = req.body

      let IdEncripter = await EncrypterAES((InformationRecipe.Id).toString(), iv)
      let IvTemporal = crypto.randomBytes(16);
      let bd = admin.firestore()
      await bd.collection('Clients').doc(IdEncripter).update({
        Name: await EncrypterAES(InformationRecipe.Name,IvTemporal),
        LastName: await EncrypterAES(InformationRecipe.LastName,IvTemporal),
        Phone:await EncrypterAES (InformationRecipe.Phone,IvTemporal)
      })
      res.status(200).json({Flag:true})
    } catch (error) {
      req.status(400).send(error)
    }
  })
})
exports.UpdateExtraInformation = onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      res.status(400).send("Metodo incorrecto");
      return;
    }
    try {
      let InformationExtra = req.body

      //let IdEncripter =await EncrypterAES((InformationExtra.Id).toString(), iv)
      let bd = admin.firestore()
      await bd.collection('ClientInformation').doc(InformationExtra.Id).update({
        TargetWeight: InformationExtra.TargetWeight,
        ActualWeight: InformationExtra.ActualWeight,
        Height: InformationExtra.Height,
        Waist: InformationExtra.Waist,
        Hip: InformationExtra.Hip,
        Arms: InformationExtra.Arms,
        Chest: InformationExtra.Chest,
        Thigh: InformationExtra.Thigh,
        Weights: {
          StarWeight: InformationExtra.Weights.StarWeight,
          Weight3: InformationExtra.Weights.Weight3,
          Weight2: InformationExtra.Weights.Weight2,
          Weight1: InformationExtra.Weights.Weight1,
          LastWeight: InformationExtra.Weights.LastWeight,
          DateStar:InformationExtra.Weights.DateStar,
          Date3:InformationExtra.Weights.Date3,
          Date2:InformationExtra.Weights.Date2,
          Date1:InformationExtra.Weights.Date1,
          DateLast:InformationExtra.Weights.DateLast
        }
      })
      res.status(200).json({Flag:true})
    } catch (error) {
      req.status(400).send(error)
    }
  })
})
exports.UpdateMenuDay = onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      res.status(400).send("Metodo incorrecto");
      return;
    }
    try {
      let InformationMenu = req.body
      //let IdEncripter =await EncrypterAES((InformationMenu.IdMenu).toString(), iv)

      let bd = admin.firestore()
      await bd.collection('Menus').doc(InformationMenu.IdMenu).update({
        Breakfast: InformationMenu.Breakfast,
        Dinner: InformationMenu.Dinner,
        Lunch: InformationMenu.Lunch,
        Meal: InformationMenu.Meal,
        Refreshment: InformationMenu.Refreshment,
        Snack: InformationMenu.Snack
      })
      res.status(200).json({Flag:true})
    } catch (error) {
      req.status(400).send(error)
    }
  })
})
//DELATE
exports.DeleteRecipe = onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      res.status(400).send("Metodo incorrecto");
      return;
    }
    try {
      let InformationDelate = req.body
      if (!InformationDelate.Id || !InformationDelate.Collection) {
        res.status(405).send("Informacion Incompleta")
        return
      }
      //let IdEncripter = EncrypterAES(InformationDelate.Id, iv)

      let bd = admin.firestore()
      await bd.collection("Recipes").doc((InformationDelate.Id).toString()).delete()
      res.status(200).json({Flag:true})
    } catch (error) {
      req.status(400).send(error)
    }
  })
})
exports.DeleteClientInforamtion = onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      res.status(400).json({Flag:false})
      return;
    }
    try {
      let InformationDelate = req.body
      if (!InformationDelate.Id) {
        res.status(405).json({Flag:false})
        return
      }
      let IdEncripter = await EncrypterAES((InformationDelate.Id).toString(), iv)

      let bd = admin.firestore()
      await bd.collection("Clients").doc(IdEncripter).delete()
      res.status(200).json({Flag:true})
    } catch (error) {
      req.status(400).json({Flag:false})
    }
  })
})
exports.DeleteExtraInformation = onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      res.status(400).json({Flag:false});
      return;
    }
    try {
      let InformationDelate = req.body
      if (!InformationDelate.Id) {
        res.status(405).json({Flag:false});
        return
      }
      let IdEncripter =await EncrypterAES((InformationDelate.Id).toString(), iv)

      let bd = admin.firestore()
      await bd.collection("ClientInformation").doc(IdEncripter).delete()
      res.status(200).json({Flag:true});
    } catch (error) {
      req.status(400).json({Flag:false});
    }
  })
})
exports.DeleteMenuDay = onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      res.status(400).json({Flag:false});
      return;
    }
    try {
      let InformationDelate = req.body
      if (!InformationDelate.Id) {
        res.status(405).json({Flag:false});
        return
      }
      //let IdEncripter = EncrypterAES(InformationDelate.Id, iv)

      let bd = admin.firestore()
      await bd.collection("Menus").doc((InformationDelate.Id).toString()).delete()
      res.status(200).json({Flag:true});
    } catch (error) {
      req.status(400).json({Flag:false});
    }
  })
})
exports.DeleteClientMenus = onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      res.status(400).json({Flag:false});
      return;
    }
    try {
      let InformationDelate = req.body
      let bd = admin.firestore()

      if (!InformationDelate) {
        req.status(400).json({Flag:false});
        return
      }

      InformationDelate.forEach(async (Element) => {
        let IdEncripter = await EncrypterAES(Element.toString(), iv)
        await bd.collection("Menus").doc(IdEncripter).delete()
      })

      res.status(200).json({Flag:true});

    } catch (error) {
      req.status(400).json({Flag:false});
    }
  })
})