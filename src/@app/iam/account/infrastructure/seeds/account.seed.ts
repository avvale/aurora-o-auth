// ignored file
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { IamAccountType } from '@api/graphql';
import { users } from '../../../user/infrastructure/seeds/user.seed';

export const accounts = [
    // user demo
    {
        id: '092d0372-5af7-482b-be2a-6e4c84921aa6',
        type: IamAccountType.USER,
        code: null,
        email: 'john.doe@refrival.com',
        isActive: true,
        clientId: '5ac621dc-be2c-4e84-a4e4-6a08cc5a8488',
        dApplicationCodes: ['orion'],
        dPermissions: {},
        dTenants: [],
        dScopes: ['GDO','DRIVER','LOADER','CARRIER'],
        data: null,
        roleIds: [],
        tenantIds: [],
        user: users[0],
    },

    // carriers
    {
        id: 'e31395ab-855f-410b-87fa-2276bb0e7933',
        type: IamAccountType.USER,
        code: null,
        email: 'yolanda.robador@indufisa.es',
        isActive: true,
        clientId: '5ac621dc-be2c-4e84-a4e4-6a08cc5a8488',
        dApplicationCodes: ['orion'],
        dPermissions: {},
        dTenants: [],
        dScopes: ['CARRIER'],
        data: null,
        roleIds: [],
        tenantIds: [],
        user: users[1],
    },
    {
        id: 'd573132a-9e1a-4217-a7e5-47e6cf340b83',
        type: IamAccountType.USER,
        code: null,
        email: 'antoniosoto@innbesur.com',
        isActive: true,
        clientId: '5ac621dc-be2c-4e84-a4e4-6a08cc5a8488',
        dApplicationCodes: ['orion'],
        dPermissions: {},
        dTenants: [],
        dScopes: ['CARRIER', 'LOADER'],
        data: null,
        roleIds: [],
        tenantIds: [],
        user: users[2],
    },
    {
        id: '8a58f202-393a-4fe5-8725-35dce7b7a555',
        type: IamAccountType.USER,
        code: null,
        email: 'yolanda.fiel@indufisa.es',
        isActive: true,
        clientId: '5ac621dc-be2c-4e84-a4e4-6a08cc5a8488',
        dApplicationCodes: ['orion'],
        dPermissions: {},
        dTenants: [],
        dScopes: ['CARRIER'],
        data: null,
        roleIds: [],
        tenantIds: [],
        user: users[3],
    },

    // drivers
    {
        id: 'a83ca2c5-8fb5-4888-9d89-db0fbaebc24c',
        type: IamAccountType.USER,
        code: null,
        email: 'franciscojavier.pomares@indufisa.es',
        isActive: true,
        clientId: '5ac621dc-be2c-4e84-a4e4-6a08cc5a8488',
        dApplicationCodes: ['orion'],
        dPermissions: {},
        dTenants: [],
        dScopes: ['DRIVER'],
        data: null,
        roleIds: [],
        tenantIds: [],
        user: users[4],
    },
    {
        id: '5938616e-fafd-4346-a50b-93b51f287232',
        type: IamAccountType.USER,
        code: null,
        email: 'roberto.lazaro@indufisa.es',
        isActive: true,
        clientId: '5ac621dc-be2c-4e84-a4e4-6a08cc5a8488',
        dApplicationCodes: ['orion'],
        dPermissions: {},
        dTenants: [],
        dScopes: ['DRIVER'],
        data: null,
        roleIds: [],
        tenantIds: [],
        user: users[5],
    },
    {
        id: 'de2f30cd-bb0e-4c50-8def-315ac97b2b27',
        type: IamAccountType.USER,
        code: null,
        email: 'josemaria.borrego@indufisa.es',
        isActive: true,
        clientId: '5ac621dc-be2c-4e84-a4e4-6a08cc5a8488',
        dApplicationCodes: ['orion'],
        dPermissions: {},
        dTenants: [],
        dScopes: ['DRIVER'],
        data: null,
        roleIds: [],
        tenantIds: [],
        user: users[6],
    },
    {
        id: 'cd1792d1-2d39-471a-91df-5e5b5fb16f0f',
        type: IamAccountType.USER,
        code: null,
        email: 'josemanuel.fernandez@indufisa.es',
        isActive: true,
        clientId: '5ac621dc-be2c-4e84-a4e4-6a08cc5a8488',
        dApplicationCodes: ['orion'],
        dPermissions: {},
        dTenants: [],
        dScopes: ['DRIVER'],
        data: null,
        roleIds: [],
        tenantIds: [],
        user: users[7],
    },
    {
        id: 'c10d0c33-967b-4d13-8852-53ad08b15fb1',
        type: IamAccountType.USER,
        code: null,
        email: 'jesus.prada@indufisa.es',
        isActive: true,
        clientId: '5ac621dc-be2c-4e84-a4e4-6a08cc5a8488',
        dApplicationCodes: ['orion'],
        dPermissions: {},
        dTenants: [],
        dScopes: ['DRIVER'],
        data: null,
        roleIds: [],
        tenantIds: [],
        user: users[8],
    },
    {
        id: '4b945c3f-3662-4009-acf5-3b68ac957f5a',
        type: IamAccountType.USER,
        code: null,
        email: 'tony.jhonson@indufisa.es',
        isActive: true,
        clientId: '5ac621dc-be2c-4e84-a4e4-6a08cc5a8488',
        dApplicationCodes: ['orion'],
        dPermissions: {},
        dTenants: [],
        dScopes: ['DRIVER'],
        data: null,
        roleIds: [],
        tenantIds: [],
        user: users[9],
    },
    {
        id: '077fafdf-0fe7-47e7-8d04-27acba14cd03',
        type: IamAccountType.USER,
        code: null,
        email: 'francisco.casado@indufisa.es',
        isActive: true,
        clientId: '5ac621dc-be2c-4e84-a4e4-6a08cc5a8488',
        dApplicationCodes: ['orion'],
        dPermissions: {},
        dTenants: [],
        dScopes: ['DRIVER'],
        data: null,
        roleIds: [],
        tenantIds: [],
        user: users[10],
    },
    {
        id: '33b73a26-2f36-463d-b430-4a8391462abe',
        type: IamAccountType.USER,
        code: null,
        email: 'geovanny.cedeno@indufisa.es',
        isActive: true,
        clientId: '5ac621dc-be2c-4e84-a4e4-6a08cc5a8488',
        dApplicationCodes: ['orion'],
        dPermissions: {},
        dTenants: [],
        dScopes: ['DRIVER'],
        data: null,
        roleIds: [],
        tenantIds: [],
        user: users[11],
    },
    {
        id: '436232f4-00b0-46b3-8721-86c2b2d3d797',
        type: IamAccountType.USER,
        code: null,
        email: 'ruben.penas@indufisa.es',
        isActive: true,
        clientId: '5ac621dc-be2c-4e84-a4e4-6a08cc5a8488',
        dApplicationCodes: ['orion'],
        dPermissions: {},
        dTenants: [],
        dScopes: ['DRIVER'],
        data: null,
        roleIds: [],
        tenantIds: [],
        user: users[12],
    },
    {
        id: 'd4963388-c1aa-4e35-b7fd-fb1222d72c2b',
        type: IamAccountType.USER,
        code: null,
        email: 'conductor1@innbesur.es',
        isActive: true,
        clientId: '5ac621dc-be2c-4e84-a4e4-6a08cc5a8488',
        dApplicationCodes: ['orion'],
        dPermissions: {},
        dTenants: [],
        dScopes: ['DRIVER'],
        data: null,
        roleIds: [],
        tenantIds: [],
        user: users[13],
    },
    {
        id: 'babd53ca-4268-408e-b50b-f6b56694d72b',
        type: IamAccountType.USER,
        code: null,
        email: 'conductor2@innbesur.es',
        isActive: true,
        clientId: '5ac621dc-be2c-4e84-a4e4-6a08cc5a8488',
        dApplicationCodes: ['orion'],
        dPermissions: {},
        dTenants: [],
        dScopes: ['DRIVER'],
        data: null,
        roleIds: [],
        tenantIds: [],
        user: users[14],
    },
    {
        id: '17f9f243-8f66-42df-8889-64419d4a1780',
        type: IamAccountType.USER,
        code: null,
        email: 'conductor3@innbesur.es',
        isActive: true,
        clientId: '5ac621dc-be2c-4e84-a4e4-6a08cc5a8488',
        dApplicationCodes: ['orion'],
        dPermissions: {},
        dTenants: [],
        dScopes: ['DRIVER'],
        data: null,
        roleIds: [],
        tenantIds: [],
        user: users[15],
    },
    {
        id: 'a0616a46-add7-41b4-a096-ec38eac89d9c',
        type: IamAccountType.USER,
        code: null,
        email: 'conductor4@innbesur.es',
        isActive: true,
        clientId: '5ac621dc-be2c-4e84-a4e4-6a08cc5a8488',
        dApplicationCodes: ['orion'],
        dPermissions: {},
        dTenants: [],
        dScopes: ['DRIVER'],
        data: null,
        roleIds: [],
        tenantIds: [],
        user: users[16],
    },
    {
        id: 'b15e4911-ae2f-46e6-978b-1503f31ddf3b',
        type: IamAccountType.USER,
        code: null,
        email: 'conductor5@innbesur.es',
        isActive: true,
        clientId: '5ac621dc-be2c-4e84-a4e4-6a08cc5a8488',
        dApplicationCodes: ['orion'],
        dPermissions: {},
        dTenants: [],
        dScopes: ['DRIVER'],
        data: null,
        roleIds: [],
        tenantIds: [],
        user: users[17],
    },

    // gdo
    {
        id: 'dcdf81f5-1a9f-41eb-8f75-edb31789fa7f',
        type: IamAccountType.USER,
        code: 'GdO1',
        email: 'roberto.samper@refrival.es',
        isActive: true,
        clientId: '5ac621dc-be2c-4e84-a4e4-6a08cc5a8488',
        dApplicationCodes: ['orion'],
        dPermissions: {},
        dTenants: [],
        dScopes: ['GDO'],
        data: null,
        roleIds: [],
        tenantIds: [],
        user: users[18],
    },
    {
        id: '484aecf0-36ca-4764-a896-dd0b2697fe54',
        type: IamAccountType.USER,
        code: 'GdO2',
        email: 'gerardo.delahaza@refrival.es',
        isActive: true,
        clientId: '5ac621dc-be2c-4e84-a4e4-6a08cc5a8488',
        dApplicationCodes: ['orion'],
        dPermissions: {},
        dTenants: [],
        dScopes: ['GDO'],
        data: null,
        roleIds: [],
        tenantIds: [],
        user: users[19],
    },
    {
        id: 'f8a2d1b8-fc05-4eb0-8479-69e467ad58b1',
        type: IamAccountType.USER,
        code: 'GdO3',
        email: 'pablo.gamiz@refrival.es',
        isActive: true,
        clientId: '5ac621dc-be2c-4e84-a4e4-6a08cc5a8488',
        dApplicationCodes: ['orion'],
        dPermissions: {},
        dTenants: [],
        dScopes: ['GDO'],
        data: null,
        roleIds: [],
        tenantIds: [],
        user: users[20],
    },
    {
        id: '62f05ed3-4615-44ae-95d6-2072ad2a2be9',
        type: IamAccountType.USER,
        code: 'GdO4',
        email: 'sergio.espinosa@refrival.es',
        isActive: true,
        clientId: '5ac621dc-be2c-4e84-a4e4-6a08cc5a8488',
        dApplicationCodes: ['orion'],
        dPermissions: {},
        dTenants: [],
        dScopes: ['GDO'],
        data: null,
        roleIds: [],
        tenantIds: [],
        user: users[21],
    },
    {
        id: '46a3c3d2-545c-40f2-bf6e-13786b0f565c',
        type: IamAccountType.USER,
        code: 'GdO5',
        email: 'sonia.garcia@refrival.es',
        isActive: true,
        clientId: '5ac621dc-be2c-4e84-a4e4-6a08cc5a8488',
        dApplicationCodes: ['orion'],
        dPermissions: {},
        dTenants: [],
        dScopes: ['GDO'],
        data: null,
        roleIds: [],
        tenantIds: [],
        user: users[22],
    },
    {
        id: 'ff9bbcf6-954d-45b2-bc1f-0094052186a2',
        type: IamAccountType.USER,
        code: 'GdO6',
        email: 'adrian.andres@refrival.es',
        isActive: true,
        clientId: '5ac621dc-be2c-4e84-a4e4-6a08cc5a8488',
        dApplicationCodes: ['orion'],
        dPermissions: {},
        dTenants: [],
        dScopes: ['GDO'],
        data: null,
        roleIds: [],
        tenantIds: [],
        user: users[23],
    },

    // loader
    {
        id: '2e1eed32-34dd-44f0-8229-83bce8a87848',
        type: IamAccountType.USER,
        code: null,
        email: 'cargador1@refrival.es',
        isActive: true,
        clientId: '5ac621dc-be2c-4e84-a4e4-6a08cc5a8488',
        dApplicationCodes: ['orion'],
        dPermissions: {},
        dTenants: [],
        dScopes: ['LOADER'],
        data: null,
        roleIds: [],
        tenantIds: [],
        user: users[24],
    },
    {
        id: '0686a719-7cf2-4f79-9391-cf463c446090',
        type: IamAccountType.USER,
        code: null,
        email: 'aruiz@semace.es',
        isActive: true,
        clientId: '5ac621dc-be2c-4e84-a4e4-6a08cc5a8488',
        dApplicationCodes: ['orion'],
        dPermissions: {},
        dTenants: [],
        dScopes: ['LOADER'],
        data: null,
        roleIds: [],
        tenantIds: [],
        user: users[25],
    },
    {
        id: '6700dc34-b6f6-4805-b723-04251bd9c525',
        type: IamAccountType.USER,
        code: null,
        email: 'cargador2@refrival.es',
        isActive: true,
        clientId: '5ac621dc-be2c-4e84-a4e4-6a08cc5a8488',
        dApplicationCodes: ['orion'],
        dPermissions: {},
        dTenants: [],
        dScopes: ['LOADER'],
        data: null,
        roleIds: [],
        tenantIds: [],
        user: users[26],
    },
    {
        id: '4e32c3b4-2569-4906-a5f6-3e11a02af106',
        type: IamAccountType.USER,
        code: null,
        email: 'jose.zortzi@gmail.com',
        isActive: true,
        clientId: '5ac621dc-be2c-4e84-a4e4-6a08cc5a8488',
        dApplicationCodes: ['orion'],
        dPermissions: {},
        dTenants: [],
        dScopes: ['LOADER'],
        data: null,
        roleIds: [],
        tenantIds: [],
        user: users[27],
    },
    {
        id: '8cf57f59-039a-4d82-a3d0-935747677ace',
        type: IamAccountType.USER,
        code: null,
        email: 'mebx0029bcn@gmail.com',
        isActive: true,
        clientId: '5ac621dc-be2c-4e84-a4e4-6a08cc5a8488',
        dApplicationCodes: ['orion'],
        dPermissions: {},
        dTenants: [],
        dScopes: ['LOADER'],
        data: null,
        roleIds: [],
        tenantIds: [],
        user: users[28],
    },
    {
        id: '487adbb0-b879-4ff4-87ba-3c73648998b4',
        type: IamAccountType.USER,
        code: null,
        email: 'operaciones@cabelloserveis.com',
        isActive: true,
        clientId: '5ac621dc-be2c-4e84-a4e4-6a08cc5a8488',
        dApplicationCodes: ['orion'],
        dPermissions: {},
        dTenants: [],
        dScopes: ['LOADER'],
        data: null,
        roleIds: [],
        tenantIds: [],
        user: users[29],
    },
    {
        id: '7c1b96c5-51a5-4bc4-a5d1-714928e7a798',
        type: IamAccountType.USER,
        code: null,
        email: 'eduardolopez@malaga-aliadosrefrival.es',
        isActive: true,
        clientId: '5ac621dc-be2c-4e84-a4e4-6a08cc5a8488',
        dApplicationCodes: ['orion'],
        dPermissions: {},
        dTenants: [],
        dScopes: ['LOADER'],
        data: null,
        roleIds: [],
        tenantIds: [],
        user: users[30],
    },

    // cac
    {
        id: 'c02ad063-6236-4c3e-8106-db896dce5fb7',
        type: IamAccountType.USER,
        code: null,
        email: 'ines.alcorta@ilunion.com',
        isActive: true,
        clientId: '5ac621dc-be2c-4e84-a4e4-6a08cc5a8488',
        dApplicationCodes: ['orion'],
        dPermissions: {},
        dTenants: [],
        dScopes: ['CAC'],
        data: null,
        roleIds: [],
        tenantIds: [],
        user: users[31],
    },
    {
        id: 'f67fddb5-f0b3-42ae-a7de-320850b933c9',
        type: IamAccountType.USER,
        code: null,
        email: 'anaisabel.sanchez@ilunion.com',
        isActive: true,
        clientId: '5ac621dc-be2c-4e84-a4e4-6a08cc5a8488',
        dApplicationCodes: ['orion'],
        dPermissions: {},
        dTenants: [],
        dScopes: ['CAC'],
        data: null,
        roleIds: [],
        tenantIds: [],
        user: users[32],
    },
    {
        id: 'b79c64b4-eaac-472a-98d4-d68e8bae0ade',
        type: IamAccountType.USER,
        code: null,
        email: 'yolanda.zaragoza@ilunion.com',
        isActive: true,
        clientId: '5ac621dc-be2c-4e84-a4e4-6a08cc5a8488',
        dApplicationCodes: ['orion'],
        dPermissions: {},
        dTenants: [],
        dScopes: ['CAC'],
        data: null,
        roleIds: [],
        tenantIds: [],
        user: users[33],
    },
    {
        id: '54c57757-684b-41c8-bda0-c56f2b012ca1',
        type: IamAccountType.USER,
        code: null,
        email: 'mariaines.fernandez@ilunion.com',
        isActive: true,
        clientId: '5ac621dc-be2c-4e84-a4e4-6a08cc5a8488',
        dApplicationCodes: ['orion'],
        dPermissions: {},
        dTenants: [],
        dScopes: ['CAC'],
        data: null,
        roleIds: [],
        tenantIds: [],
        user: users[34],
    },
    {
        id: '031ec999-7a39-498b-aab3-6bc3c91e43e0',
        type: IamAccountType.USER,
        code: null,
        email: 'mariaisabel.gaitero@ilunion.com',
        isActive: true,
        clientId: '5ac621dc-be2c-4e84-a4e4-6a08cc5a8488',
        dApplicationCodes: ['orion'],
        dPermissions: {},
        dTenants: [],
        dScopes: ['CAC'],
        data: null,
        roleIds: [],
        tenantIds: [],
        user: users[35],
    },
    {
        id: '65765919-1540-4726-8a05-4d8296dad8df',
        type: IamAccountType.USER,
        code: null,
        email: 'pilarflora.medrano@ilunion.com',
        isActive: true,
        clientId: '5ac621dc-be2c-4e84-a4e4-6a08cc5a8488',
        dApplicationCodes: ['orion'],
        dPermissions: {},
        dTenants: [],
        dScopes: ['CAC'],
        data: null,
        roleIds: [],
        tenantIds: [],
        user: users[36],
    },
    {
        id: 'c502bfc6-c0de-454c-8131-a56367a72231',
        type: IamAccountType.USER,
        code: null,
        email: 'anamaria.izquierdo@ilunion.com',
        isActive: true,
        clientId: '5ac621dc-be2c-4e84-a4e4-6a08cc5a8488',
        dApplicationCodes: ['orion'],
        dPermissions: {},
        dTenants: [],
        dScopes: ['CAC'],
        data: null,
        roleIds: [],
        tenantIds: [],
        user: users[37],
    },
    {
        id: 'ffcffcc1-499b-4909-b1e0-d7a6512bdf9f',
        type: IamAccountType.USER,
        code: null,
        email: 'omaira.bravo@ilunion.com',
        isActive: true,
        clientId: '5ac621dc-be2c-4e84-a4e4-6a08cc5a8488',
        dApplicationCodes: ['orion'],
        dPermissions: {},
        dTenants: [],
        dScopes: ['CAC'],
        data: null,
        roleIds: [],
        tenantIds: [],
        user: users[38],
    },
    {
        id: '207f1435-8e36-45a9-8e02-d77e0a0afb7b',
        type: IamAccountType.USER,
        code: null,
        email: 'roberto.parra@ilunion.com',
        isActive: true,
        clientId: '5ac621dc-be2c-4e84-a4e4-6a08cc5a8488',
        dApplicationCodes: ['orion'],
        dPermissions: {},
        dTenants: [],
        dScopes: ['CAC'],
        data: null,
        roleIds: [],
        tenantIds: [],
        user: users[39],
    },
    {
        id: 'a6270792-0b7f-4442-9b69-f0b51a277410',
        type: IamAccountType.USER,
        code: null,
        email: 'mariadelcarmen.torices@ilunion.com',
        isActive: true,
        clientId: '5ac621dc-be2c-4e84-a4e4-6a08cc5a8488',
        dApplicationCodes: ['orion'],
        dPermissions: {},
        dTenants: [],
        dScopes: ['CAC'],
        data: null,
        roleIds: [],
        tenantIds: [],
        user: users[40],
    },
    {
        id: '735b2a19-3aed-4a63-a374-83883d140230',
        type: IamAccountType.USER,
        code: null,
        email: 'diego.onde@ilunion.com',
        isActive: true,
        clientId: '5ac621dc-be2c-4e84-a4e4-6a08cc5a8488',
        dApplicationCodes: ['orion'],
        dPermissions: {},
        dTenants: [],
        dScopes: ['CAC'],
        data: null,
        roleIds: [],
        tenantIds: [],
        user: users[41],
    },
];