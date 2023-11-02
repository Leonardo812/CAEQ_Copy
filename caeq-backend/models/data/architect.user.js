const architectUserTestData = [
    {
        collegiateNumber: 98765,
        fullName: 'Luis García',
        memberType: 'Miembro de número',
        classification: 'Docente',
        DRONumber: 'DRO98765',
        authorizationToShareInfo: true,
        lifeInsurance: false,
        lifeInsureID: '9937557b',
        age: 40,
        gender: 'Hombre',
        cellphone: 5551112222,
        homePhone: 5553334444,
        officePhone: 5555556666,
        emergencyContact: 'Ana García 5557778888',
        mainProfessionalActivity: 'Ingeniero Civil',
        dateOfAdmission: 2002,
        dateOfBirth: new Date('1983-07-20'),
        municipalityOfLabor: 'Ranchuca',
        linkCV: '-',
        university: 'Universidad Autónoma de Querétaro',
        professionalLicense: 'P98765',
        workAddress: '123 Avenida Principal, Querétaro',
        homeAddress: '456 Calle Secundaria, Querétaro',
        specialty: 'Corresponsable en seguridad estructural',
        positionsInCouncil: 'Vocal',
        capacitationHours: 90,
        annuity: true,
        email: 'relisib653@mugadget.com',
        password: 'password123',
        passwordConfirm: 'password123',
    },
    {
        collegiateNumber: 54321,
        fullName: 'Laura Martínez',
        memberType: 'Miembro Adherente',
        classification: 'Expresidente',
        DRONumber: 'DRO54321',
        authorizationToShareInfo: true,
        lifeInsurance: true,
        lifeInsureID: '54321XYZ',
        age: 50,
        gender: 'Mujer',
        cellphone: 5558889999,
        homePhone: 5557776666,
        officePhone: 5554443333,
        emergencyContact: 'Carlos Martínez 5552221111',
        mainProfessionalActivity: 'Arquitecto',
        dateOfAdmission: 2002,
        dateOfBirth: new Date('1972-03-25'),
        municipalityOfLabor: 'Ranchuca',
        linkCV: '-',
        university: 'Instituto Tecnológico de Querétaro',
        professionalLicense: 'A54321',
        workAddress: '789 Calle Principal, Querétaro',
        homeAddress: '101 Calle Secundaria, Querétaro',
        specialty: 'DUYA',
        positionsInCouncil: 'Presidente',
        capacitationHours: 120,
        annuity: true,
        email: 'laura@example.com',
        password: 'password456',
        passwordConfirm: 'password456',
    },
    {
        collegiateNumber: 12345,
        fullName: 'Ana Rodríguez',
        memberType: 'Miembro Pasante',
        classification: 'Convenio',
        DRONumber: 'DRO12345',
        authorizationToShareInfo: true,
        lifeInsurance: true,
        lifeInsureID: '12345XYZ',
        age: 32,
        gender: 'Mujer',
        cellphone: 5556667777,
        homePhone: 5555554444,
        officePhone: 5557778888,
        emergencyContact: 'Luis Rodríguez 5552223333',
        mainProfessionalActivity: 'Ingeniera de Estructuras',
        dateOfAdmission: 2002,
        dateOfBirth: new Date('1989-09-12'),
        municipalityOfLabor: 'Querétaro',
        linkCV: 'https://example.com/anarodriguez-cv',
        university: 'Universidad Politécnica de Querétaro',
        professionalLicense: 'P12345',
        workAddress: '234 Avenida Principal, Querétaro',
        homeAddress: '567 Calle Secundaria, Querétaro',
        specialty: 'Corresponsable en instalaciones eléctricas',
        positionsInCouncil: 'Tesorera',
        capacitationHours: 75,
        annuity: false,
        email: 'ana@example.com',
        password: 'password789',
        passwordConfirm: 'password789',
    },
    {
        collegiateNumber: 67890,
        fullName: 'Miguel Pérez',
        memberType: 'Miembro Vitalicio',
        classification: 'Docente',
        DRONumber: 'DRO67890',
        authorizationToShareInfo: true,
        lifeInsurance: true,
        lifeInsureID: '67890ABC',
        age: 58,
        gender: 'Hombre',
        cellphone: 5551119999,
        homePhone: 5557774444,
        officePhone: 5556663333,
        emergencyContact: 'Isabel Pérez 5552228888',
        mainProfessionalActivity: 'Arquitecto',
        dateOfAdmission: 1980,
        dateOfBirth: new Date('1965-04-15'),
        municipalityOfLabor: 'Querétaro',
        linkCV: 'https://example.com/miguelperez-cv',
        university: 'Universidad Autónoma de Querétaro',
        professionalLicense: 'A67890',
        workAddress: '345 Avenida Principal, Querétaro',
        homeAddress: '678 Calle Secundaria, Querétaro',
        specialty: 'Revisor de bajo riesgo',
        positionsInCouncil: 'Vocal',
        capacitationHours: 110,
        annuity: false,
        email: 'miguel@example.com',
        password: 'passwordabc',
        passwordConfirm: 'passwordabc',
    },
    {
        collegiateNumber: 24680,
        fullName: 'Javier López',
        memberType: 'Miembro Adherente',
        classification: 'Docente',
        DRONumber: 'DRO24680',
        authorizationToShareInfo: true,
        lifeInsurance: true,
        lifeInsureID: '24680XYZ',
        age: 45,
        gender: 'Hombre',
        cellphone: 5558887777,
        homePhone: 5554443333,
        officePhone: 5556665555,
        emergencyContact: 'Sofía López 5559991111',
        mainProfessionalActivity: 'Ingeniero Civil',
        dateOfAdmission: 1810,
        dateOfBirth: new Date('1978-05-20'),
        municipalityOfLabor: 'Querétaro',
        linkCV: 'https://example.com/javierlopez-cv',
        university: 'Tecnológico de Monterrey',
        professionalLicense: 'P24680',
        workAddress: '567 Calle Principal, Querétaro',
        homeAddress: '789 Calle Secundaria, Querétaro',
        specialty: 'Corresponsable en instalaciones eléctricas',
        positionsInCouncil: 'Secretario',
        capacitationHours: 80,
        annuity: false,
        email: 'javier@example.com',
        password: 'password123',
        passwordConfirm: 'password123',
    },
    {
        collegiateNumber: 13579,
        fullName: 'Isabel Torres',
        memberType: 'Miembro Pasante',
        classification: 'Convenio',
        DRONumber: 'DRO13579',
        authorizationToShareInfo: true,
        lifeInsurance: false,
        lifeInsureID: '8144729d',
        age: 30,
        gender: 'Mujer',
        cellphone: 5553332222,
        homePhone: 5554445555,
        officePhone: 5556664444,
        emergencyContact: 'Pedro Torres 5557771111',
        mainProfessionalActivity: 'Ingeniera de Estructuras',
        dateOfAdmission: 1021,
        dateOfBirth: new Date('1992-03-10'),
        municipalityOfLabor: 'Querétaro',
        linkCV: 'https://example.com/isabeltorres-cv',
        university: 'Universidad Anáhuac Querétaro',
        professionalLicense: 'P13579',
        workAddress: '123 Avenida Principal, Querétaro',
        homeAddress: '456 Calle Secundaria, Querétaro',
        specialty: 'Dictaminador estructural',
        positionsInCouncil: 'Vocal',
        capacitationHours: 95,
        annuity: true,
        email: 'isabel@example.com',
        password: 'password456',
        passwordConfirm: 'password456',
    },
    {
        collegiateNumber: 74585,
        fullName: 'Gabriela Popoca',
        memberType: 'Miembro Pasante',
        classification: '-',
        DRONumber: 'DRO13579',
        authorizationToShareInfo: true,
        lifeInsurance: false,
        lifeInsureID: '8144729d',
        age: 30,
        gender: 'Mujer',
        cellphone: 5549625942,
        homePhone: 5959529026,
        officePhone: '',
        emergencyContact: 'Martiniano Falcón 5557771111',
        mainProfessionalActivity: 'Ingeniera de Estructuras',
        dateOfAdmission: 1021,
        dateOfBirth: new Date('1992-03-10'),
        municipalityOfLabor: 'Querétaro',
        linkCV: '',
        university: 'Universidad Anáhuac Querétaro',
        professionalLicense: 'P13579',
        workAddress: '123 Avenida Principal, Querétaro',
        homeAddress: '456 Calle Secundaria, Querétaro',
        specialty: 'Dictaminador estructural',
        positionsInCouncil: 'Vocal',
        capacitationHours: 95,
        annuity: true,
        email: 'jorgeelastro@gmail.com',
        password: 'password456',
        passwordConfirm: 'password456',
    },
    {
        collegiateNumber: 45672,
        fullName: 'Fernando Muñoz',
        memberType: 'Miembro Pasante',
        classification: '-',
        DRONumber: 'DRO13579',
        authorizationToShareInfo: true,
        lifeInsurance: true,
        lifeInsureID: '8144729d',
        age: 30,
        gender: 'Mujer',
        cellphone: 5553332222,
        homePhone: 5554445555,
        officePhone: 5556664444,
        emergencyContact: 'Pedro Torres 5557771111',
        mainProfessionalActivity: 'Ingeniera de Estructuras',
        dateOfAdmission: 1021,
        dateOfBirth: new Date('1992-03-10'),
        municipalityOfLabor: 'Querétaro',
        linkCV: null,
        university: 'Universidad Anáhuac Querétaro',
        professionalLicense: 'P13579',
        workAddress: '123 Avenida Principal, Querétaro',
        homeAddress: '456 Calle Secundaria, Querétaro',
        specialty: 'Dictaminador estructural',
        positionsInCouncil: 'Vocal',
        capacitationHours: 95,
        annuity: true,
        email: 'jcastr@tec.mx',
        password: 'password456',
        passwordConfirm: 'password456',
        isLegacy: true,
        isOverwritten: false,
    },
];

module.exports = architectUserTestData;