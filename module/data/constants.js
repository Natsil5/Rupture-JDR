export const SEX = {
    MALE: "Male",
    FEMALE: "Female",
};
export const COMPETENCES = Object.fromEntries(
    Object.keys({
        combats:"Comp Combat",arme1:"Arme de poing",arme2:"Fusil d'assaut",arme3:"Fusil",arme4:"Arc",arme5:"Arme d'Hast",arme6:"Masses",arme7:"Couteau",arme8:"Lames",arme9:"Haches",blocage:"Blocage",esquive:"Esquive",
        magies:"Comp Magie",canalisation:"Canalisation",rituel1:"Rituel (Noüs)",rituel2:"Rituel (Psykhée)",rituel3:"Rituel (Sôma)",
        echos:"Comp Echo",echos1:"Echo (Noüs)",echos2:"Echo (Psykhée)",echos3:"Echo (Sôma)",engramme1:"Engramme (Noüs)",engramme2:"Engramme (Psykhée)",engramme3:"Engramme (Sôma)",
        physiques:"Comp Phy",athletisme:"Athlétisme",discretion:"Discrétion",endurance:"Endurance",natation:"Natation",
        sociales:"Comp Soc",baratin:"Baration",commandement:"Commandement",dressage:"Dressage",intimidation:"Intimidation",marchandage:"Marchandage",persuasion:"Persuasion",representation:"Représentation",seduction:"Séduction",
        techniques:"Comp Tech",artisanat1:"Travail du Métal",artisanat2:"Tissu & Cuir",artisanat3:"Travail du bois",artisanat4:"Travail de la pierre",informatique:"Informatique",ingenierie:"Ingénierie",medecine:"Médecine",Métier:"Métier",savoir1:"Savoir (Magie)",savoir2:"Savoir (Physique)",savoir3:"Savoir (Histoire)",savoir4:"Savoir (Biologie)",savoir5:"Savoir (Chimie)",survie:"Survie",traque:"Traque",
        utilitaires:"Comp util",canotage:"Canotage",concentration:"Concentration",conduite:"Conduite",equitation:"Equitation",escamotage:"Escamotage",navigation:"Navigation",perception:"Perception",pilotage:"Pilotage",
    }).map(attr => [attr, `Rupture.Character.Competences.${attr}`])
);