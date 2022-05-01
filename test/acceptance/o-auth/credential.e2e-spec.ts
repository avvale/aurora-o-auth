import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { GraphQLConfigModule } from '../../../src/@aurora/graphql/graphql-config.module';
import { OAuthModule } from '../../../src/@api/o-auth/o-auth.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// ---- customizations ----
import { AuthModule } from '../../../src/@apps/o-auth/shared/modules/auth.module';

const importForeignModules = [];

describe('credential', () =>
{
    let app: INestApplication;
    const jwtOptions: JwtModuleOptions = {
        secret: '1234567890',
    };
    //let repository: MockCredentialRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ...importForeignModules,
                OAuthModule,
                AuthModule.forRoot(jwtOptions),
                GraphQLConfigModule,
                SequelizeModule.forRootAsync({
                    imports   : [ConfigModule],
                    inject    : [ConfigService],
                    useFactory: (configService: ConfigService) =>
                    {
                        return {
                            dialect       : configService.get('TEST_DATABASE_DIALECT'),
                            storage       : configService.get('TEST_DATABASE_STORAGE'),
                            host          : configService.get('TEST_DATABASE_HOST'),
                            port          : +configService.get('TEST_DATABASE_PORT'),
                            username      : configService.get('TEST_DATABASE_USER'),
                            password      : configService.get('TEST_DATABASE_PASSWORD'),
                            database      : configService.get('TEST_DATABASE_SCHEMA'),
                            synchronize   : configService.get('TEST_DATABASE_SYNCHRONIZE'),
                            logging       : configService.get('TEST_DATABASE_LOGGIN') === 'true' ? console.log : false,
                            autoLoadModels: true,
                            models        : [],
                        };
                    },
                }),
            ],
        })
            .compile();

        app         = module.createNestApplication();
        //repository  = <MockCredentialRepository>module.get<ICredentialRepository>(ICredentialRepository);

        await app.init();
    });

    test('/REST:POST o-auth/credential - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/credential')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });


    test('/REST:POST o-auth/credential - Got 400 Conflict, CredentialId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/credential')
            .set('Accept', 'application/json')
            .send({
                id           : null,
                grantType    : 'CLIENT_CREDENTIALS',
                username     : '18fh8x1leu76yepdmr523dex7jaa6aregmru1l0nep1nt5b7ps1j8gtxaih63yzt2dmqe43s8o73pjl9f5eilgh94mfxmhrxzxyrcwpmurbqee906r9peikqdjeziahhsipurpgad4tlrt1a7lg7iupgawcq1w6wowiijpnsh7mkj01kgvnqkioagoixcpafpgj7dvdabbicyqa68b6ju3rmiilcmifpe83xjnpjd7iaaqdjzlj8yzwolp1rcy4',
                password     : 'non4bp98ot31hh32n5r7nvk5xgu4uhqqeisa2ho5h4y363rp6f6rcbuxdeypu8kowbai54s55554iovw05uo8m3omb3jwl97elik3kf1xyhcwp7lea6a7nm4n8q124c9q7q3cwdsd207mjmut8pdrkvz22nfsbdbocgcmtywlc72vi22q6xori0a8ehyzkcz46v8e76wuqb7uz78otmy2e9pqv1a1ym2ikr81sx7vswupazcyh3pfix2racnez0',
                accessTokenId: '077e099f-2640-4f12-b1d8-eef80ee8cff9',
                refreshToken : 'Magnam architecto quia temporibus autem et et natus. Impedit voluptas repellendus magnam error natus. Tempore eius neque minus voluptas voluptatem hic voluptates. Fugiat ad pariatur et expedita nostrum et et est quis. Eveniet et nihil animi provident.',
                clientSecret : 'yaktci4bwurzd5rx5anjhhsshgl1kggdh7z1sb8b9enqgabmnnsopyzw7z69l5nn1ap7vrb57otslb1501zxfdk6uk',
                redirect     : '5kzh3sol94r0fgnmgpujlccykmz03y9soxxs8iapwx8ob23dtb3w8qmj08qonabzzjgsep6399gw02r221jfg6wmi9ypyrp0675x1jrg8hg7pvy5on90gevpaueon677aysamxtj0gwzckf1tnubagc6dvk9dq5bhpbhk58hlyowz0r6n1xj9uj29ms1ph50b69nnnz0bv7tvxut7klp29voykk8hpgwzd2f2o3pfpfbjd3jhzyudv1afwo8incu7d9ouauu302712p5jn48munqzra3j38kj0hlgsdql551rgwrt1zgy18cwggms05ljt1w1eq7ld64o6797repijck19cl9ylxfkz4gmtjs2rhz521hq9ly0uudbmngved65viu06a9pta8xkoyahuavhqwc6g21cnirlomqkp68b251rlvbpi8vivttrv6pv0593kvw5zs38szsfnlqt1meeabjuz8yjimt3vbhyz3zczog47yxetxq1xf8wjbxmeuimtxrbtik05306zrqa2508yzoxk0exxv0e0hvqzn8tyfxmrzxhb4jntksve829jf5ba6a81po1kcbulqktl6sxbdqe3hxh4qh3roeq49heoy9dsi7nj2q9wving9s4l1b60x99llebscrtuqdhugde0wig6vds4bcbbbm1tvtp1kye5ya4hstoiiq2pfjumi9zteeyw6l18z1oa6evbbsfth5f1worj1tv3spkcnl3kw88pik5zh4jcf5pjkc5j3tlpeon5kcynd9tixzd1g2uxzdbm8c6zts845tpewrtuokzhuehdk2k9a1wkcdozw1ilbk7zya84f5u3nocy1i1lpycrtbiovbs9feuo95g1hp2h63bypiadtofvl2xknsr4gfrt73n9i8zshhf31g5o3se68c1tq8t47gvjuqw2xi13l49agcu0xqbohxghzxmbhomjg20zl903d5l86qmwgdb1svhj5wca7bb1ng9d7atpj5o1jt5neu63wkmbyv8g1erqaamhan816m7w76x7wufgp6933o2iw22tu9phhr81nhdcc6f3njqagtm010qlgc94zlknxcu60as7uk3i790x7ujt1trw10l3a1o05rmn8opdhbsaul795nfhfdqulkgduiy2f6w0l5y4tzt2n5y3hac2erkn6yp3chyyj9u3tir05y2kktjlyfvzmqs9w4a1v5owri1f4ighp6m8hp6ishfuavhqjn6wv5l5ad70ar91k6rsw3qkbszalvpfze5hp4kejm96gyyp7stet4vhtfqe2zgu08oxpl5n1xe9rkgpq75pbs5ej94zc1pu9egimpszz4fqodnab6bz4kp8nsf3bzomapbjvnfvjazo2wpszpr6xr592poxz1i27kqhpb2eu5v99pwfgjzjoo7ov6b1fu80mlxs12eupb5o46x67c5iznvbtd7mticwy0pqlszsvefxedtyc0jx83tmk6qnh24bxbqmdtc2g1vtkbtx0e6fgw0syk2u6hsg022aqh2yv6t90vxv2n1cwmys44g5bbbdgl6m8afhmlaiinbjscuo6yor26t9zyafwsuql04e8r6rrbdkkw5okqz2jnkh78vqd5mndp493pevnjjz4i3bodb01mb7hld03g81qipk8dzzmnao1if5v2ox3x24qkvxbbd25l981a2nn3cacqhw0ok0xinbmg1aln8v1grmjvlzockb68i1mt7rzfmno4c0a4ht1s9oqlulfqx28p0p5xg84skyua98wn9ftqso3w655jpcxq9pe6c50xfdb2gafvw5rc4e7fqitkfathd5iccfextiyixy8unygdbqnmihh0a3wvmpuaggkivltfu4b1gpa9c49j50ihbi9qnkxtd6oap0yshlt2ppw43u80ub7ru3srlc1non3x4gbn0yrba1ty3fhjw7zoue4qh34eiybcouevmkrgo31wakl8f0occd7lvkw8qcjwl0grygj2fzwb170bfu0dbopow653ry527w',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CredentialId must be defined, can not be null');
            });
    });

    test('/REST:POST o-auth/credential - Got 400 Conflict, CredentialId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/credential')
            .set('Accept', 'application/json')
            .send({

                grantType    : 'CLIENT_CREDENTIALS',
                username     : 'pn99suebzowrjr5ukh0eieeavth1udb7d5qlnd6phy8ei4k6qmsqbmtv54wm0osn5q09ecaxiwvhagaydptr3tagwdwu2t9npeifcw9dr5awgkjk6w12ft90kq3je5gfncvw5eloqa968cmb4q0pnl1s1c6lhlj2d8bfi7b2yn4uha7pzlwhrihijak3mq0ia71tkzxipwu3grb74yyx0z9ysqc24a6fx1gkltz44ep3kkbkzghgfjwpfjpufyg',
                password     : 'btdlv2ampmdt3vmdv4wpn8fsq8esn2r9suhkrqvweetmxshee66kqgesugd8qn1vd1lzj6fbv8bplx5aelkcc0anxgw8ggdejrnqihedsaciawxxbkyosm3p2ajg7l2h52pgog8gwo658a5yran5xz6vkjimyoczslhwt17ss2xlu7wbka3lj26du7ubzo1m4wdhdlr1d14kn4v3i42zk0j46ad3118u5gm8v1tz6lnknpacz1aq6jiwbabveba',
                accessTokenId: '077e099f-2640-4f12-b1d8-eef80ee8cff9',
                refreshToken : 'Id debitis optio. Voluptatem enim incidunt molestiae qui perferendis. Molestiae autem voluptatem esse in qui odit tempore ea cupiditate. Beatae rerum architecto est facere alias. Pariatur quos nam animi architecto natus voluptates sequi corporis.',
                clientSecret : 'seyarjox65pfqu2tpwudex4hujo74pcm48jxmwlcif1cx69aihbl1ezl5avlc2zpdzsdunoyqlsdlcmle8vzyfyz08',
                redirect     : '4desxtgu0c57zl5ezktv8heb73mv0a1u5h369vj4rfv1lsq3dj3e4afpkonn9ke7x6lwz3og2dezc4z01k76x9b5umohxs6cf2nma49icn4qwe07xam3xts3xayxm3vxl1s5bnqpku91czev4ygq5s13l13nhjm43n0dh159nbwudlm6cu75lojgb99bf3gogvzjjs5cg2r19nwa5n37ihor5kiwyyigsrqd7gw1hvhsruozjtkx1c40kodci5wbzz0k0lfioezpyr1tova466r1cijzpz0x96vrw4wyr9da37hu8o1iy8m6k28ephz4soi55xywhufuh34qdmreoeb3tn8kykficcgtfrz91pg92gslwqpufiitnkwoh5frgld9byvzxtl9nlan8dkb84se62okpanyw4ci5pq5y99eghja4iactdmiguk64emnrhab0qf7gy1onr7e1wifvesy93a5sbvf72t72a4cxvhdidpabekja9jx2xzojxyxtrq7yd6mx9iho8t9ds7hf6i20duufifsrsuj0fr867eiowd6ykbx6sqmvwmw7uwt1b22q3d7bmnwdvh9gxsonsw7h2h9fzws2ylzg0u37mz4tu89c7hz04uoqsv8o25ygqc14fnu7nc90hn3xolil8jp6du9kqow5h3a5ak252h88xkk1z88wuooegrccfbcodr0552ayz5fz8qvnf4muzfak6c4qe9h4auqi48fxz8yuhds70lpdfkphoarflpnsl296f93mullia7i3h60y1b9kh3ozy4gzssndg66kmezxuksyiyb6hro8xds7ve3r473j118kcf02gq9yjmsxdrkuqrmm37ae770q7xj376faf4ttjzhuoldkvo0n8859pp9bduqnrvqt1jfhu6fzbkq3nkur7g8y5tpxrs676bz7kdbu2yiclbmxks59yt6xnjczo2c3mhgs762bovjdlj489phgyh4ww1rk1souxz93aj97zagbsmykk29h5xvnzp0u6ntdrvs2bfr8lotdwoi1n31kds691yk5z8siqjn7h8qob4asvxx7bji66brywkcm1boy81dbc618h0hvdeimxi34ccufnck5z3ifl651eprvs99gkd92ihzvu8zoea6odkcs2w9lo1ftp28y5ewuflzww19apmggd433r7t4pfhqqn1hbj1wjzx76fpt3bdkwow0vsg84o8z1oiujws9j4yhbjh1qhp9ekege0vcoa1kbgod4dt4h8fht1g51nzksftosd15r4c3d4fnesz6krb2zpw34z7pd7uf1boru20rz398ll13zl4rin0bd02iiwuble4eo41g4l8xb3fmcbhfnlz6ey19w1kkavnotvo8qodoh1ndkv0m3edgyh21c1v7rhxh5f8gf7sltgz477aiv7yedqzn9islcsmhcti9n9x8lk5nflpn7tqi9cihfzma3015hniibpx33b5it98a6q9ubrvj2lc8grv0rkgrhtjc8btqy72xebhkw0cxume5axpdng1u1ysy5mtq7626ciwuka8h9wjy8d9vpybjv4livtvpv1wuhf5ddx01wq9uen3fjht3lzivhr50xveifaemor94fzyq94x9c4msfk8zlqeeyu2ol0st063qi65ii0siep7axj2pwopx6dfkq2it34foqm2niuyc584a470fps8e5ve6byzv4uj6kgexdplkgxanibjzyp5kpmwlzg1t68a11r23bkb6pwsujfwe2wkvvz4yphgkf850ilmbifzexw1qa3adr5jv1dosxav346bzwhdb99xswhuoz1ihatavednxx2baxtng90ssc3msoqjvnu4r4sxcc9243zam42943j14cf55ur2b9puxealcnef8chwfxvjjmvm0id0xwcvtj1txz9wjh0yozizy5pddcs1n0hb4ncgs7kfz74wcqkddpaycsil1y01vknj1j5igtb3xt4hi6wosnmab7vugz70r6bfazfb6rfn1uff5rqkl19s',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CredentialId must be defined, can not be undefined');
            });
    });

    test('/REST:POST o-auth/credential - Got 400 Conflict, CredentialGrantType property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/credential')
            .set('Accept', 'application/json')
            .send({
                id           : '7683f8ed-b151-46f1-883a-cd529011c4bf',
                grantType    : null,
                username     : '1emgse2tq6vynqjr560xbz3sfu5b8szmgaatj2qqqvdptmzf8di750y4iju0ac2fze87ef6tfteeg69ehpaseatv06mvxf7meiejz20vz9oa5em2gy7769ta8ssx5gdl2l0up5666vm2i5stwpgskl7kwpb6l5tuajoq86trtr5zwtqor9mbk22rnptveuhd3ywd44ksciep0ukzf67i9pwcuqn28zegkl2x3qcptkkuoe9d1vbcuc3xpwozzxg',
                password     : '62nlka6d87f5ktxlt9xlfkt6o5xgraapxmql7rs16rw6i5h42etl360bk9ord2w06xartgsr4i8pzh6c8bhkj8xj8vv2n0amoq2bna9hqkckvjxnrdizltn60fz9kdsojwef138ldbyiph2agzgpcuw53gvlv9f11yhz8qa5tv9vg356qoqb7psp1d16qypp6rrjlv8ao5o9do41bm6c4cuoawryx9wz09ax08umzzgbd3phvxidox9yaup4tal',
                accessTokenId: '077e099f-2640-4f12-b1d8-eef80ee8cff9',
                refreshToken : 'Veniam nesciunt deleniti dolor tempore dolorum. Nam aliquam aut veniam. Animi provident error minima cum iure. Quo est occaecati odit enim vitae quis qui.',
                clientSecret : 'usith88xi17kuqll0il29irpbaucgkc4qd1hwb1wnpa6c8fdyqt83ox0gvi2k77i7d71fe9kychsi6pbc412wedd15',
                redirect     : '2ggtn9o8zxe7959shpfq7jfy010d1570a3oa5hkks83d93e2d2r7sfhh7jajb9cez9f0o3a8p5wo81850g6spp7mu73k9lang6heq1qzjtgtubv6urq415qoyu3vjn0789sh4w8bp8avjvyud4foif51gldg7wxtfw5za23gde4quc752mdl8ggps67jqxwwqibkz4v0pyd6ohxjnzqg8rbm9564mopeuhca0h4zqwx1amawabwzyot8enpz3clzmj7nypku9op3yyvgjmpggf4f78oskyun9yiotjw46qby31hhs7ze9amgu53k5jw4luzz5ehjjobnfn52gc7zxj9g39v6qnrdafql43gnyyyf8ue61d5xcktjju55df6ubgwb7yvgv5ec1hqvfohh1ylayozb6do8kgfiaxyo54dm285zwmzujybzyd6ci80lao4urafjn325afb2c5767v3bd3vdnnqv96wcf4wzvc3l67bd0ajv1b1fyg70mzs69uyof2mvxhqitwsnhau5m5hp4vkf9f9u1f68lm8lgr7jl2o76jjnppiceema5tve8tjvns8oakqeihllli8xnsropti0y709j69rmbk8eu0zwsga4wv2imcrvernjpb9mmwt67n2z5taae9wuwroglnbc3h44nn5a6t63wrlni792gchso6zravibwvnjh2isoninal1kt40svgh4mk0n3d2x0t3yk8bobv7xn6lwp9znzjg0g9fra7xkek2vjfbiv0p5w8fxv0lozom43e87ossy7k2jbn99atddw0tplbrl8jaso0nai76wrtrxl7oisyuyj7xq7qgtwumxc6ad8um8lgh1e99k0n2wr921tp44w3zxvziwqkoj1rxxvgxjciakghjvuocr0ggeaogfk8cfuffp2rbv9zo5vpt2x7qtmra8gduyzgt1eukzzk9s7er9v3vgwg8bl7cm5elzwg6oxpx67f7z65xyiokw3lcj1grkwt3cx3k642s38qoul4b32dyjipf5d1au0zlx7g05dvw551jdwfpbscll27hcofpkmaw5k408ey9t5uc89808hy3mkujc5yhy9zuw1o2w0rc0stuyoc2o2bm0eu6nb8e0fn3gy13xl8c4w19gzgc6nwek4gxifif9rks0i4f4ys3dlbawlqwfn8wvojyubneivjjx85pqvwyjt4f40vr3yigs94ofci6ectaho8ymjjz9uf3zsmly6o59sjq5ypn7ej8sfp855x7u0kema1df22egs10frqgv54ger8r0wdxuq84hz5ubjsdnkoxymg6ovrftw9jn8b3bj8ndo9c2yfj6qtfd2vjv4rvevjpfxvsd19iibfe8h4hmaqp6ak18wvhg901hijkhaauf9vrlecoq73hnnbhwfaw9sgl2q0r69yy1223k635zm0tjhf10ns6t996ks09v3t6wbw441k45azq3x9suw1kr3wkob6s08gmg431p6wctzji9teux2pidzn16its8kqohkebp48v1eleal3c6jmhlspympd4rwclx2ivsm629zi7heezt51k5dlvufy0wwc1pz52g2b53nteadadzirct95utvwe5glmr32pljiee9mk8075l03kwfbb6bw545998288gr5xsgn33mw41crrd4xy5f8hj43pxsx9m3blutzjhediv7j8ygt48ez50tybxeuyt9t9zxtg6h7v4hg8y92ipszm6jf4i569u3l97dd4tn5wvswhy3mgwyrqii0h282bru7md63n4ey3q75kybhpqvo8yh6g3918cfjsqwj1w4idmzltj7u9p7mk2r3hsi86uguox70pev0wm1xynoxhmx79kvisrt4n6az4tb32tz3oegdqvlx1qm31aj3g4o1poj5fjsqakj1yuca2gi5bme2e0lww5tcsbzs6rxv37nsk0rft2qcr4bl59qk5vljwmn8bpy2q9zqizfkiz27gg9xmxhzltonm2x91no4q0510v5prryu313clstl7',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CredentialGrantType must be defined, can not be null');
            });
    });

    test('/REST:POST o-auth/credential - Got 400 Conflict, CredentialGrantType property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/credential')
            .set('Accept', 'application/json')
            .send({
                id: '7683f8ed-b151-46f1-883a-cd529011c4bf',

                username     : '5nkv2ewqoptvj4947fsaup0fikxwfdkvx2oioxj176a21fbn2ad8o7lomckegg8gc9bbdv4joqpbuc73hlzfqcqqdlg8go24wat5r4wqn3ll36a13jt6ortwxhgn5fzu6k5e9zi77neh87yx6jiyuz6t76k36jpl9jywiogr1q0e4mvd64fwemcg68yc56smhz87ybtovpkehdcol28qnvi6679yacf9uk1gbiw9v7d5lqysqzj8q8d93bv6kc2',
                password     : 'ueelz2n0npomzpntt7isybny752e7nl8yh4esco2tna7kawqzhlaspx9eg4yxqi4eyc3zlt48bdnflf7tdmy9evlm587k62shq5tx32651l8udcnj8yja7ku09wsyvoalokbjf7yo7d4308xn2bdbn6eiad89xq0q5qupawr6h50kb02nb9si6ri2fp4n5u2xw9sntd6n6twndpba30q80dfpntxo2vba7ain4em8jac95jcrdo11t2udn0kgr3',
                accessTokenId: '077e099f-2640-4f12-b1d8-eef80ee8cff9',
                refreshToken : 'Deleniti aut sed maxime est assumenda voluptatem harum. Cumque repellat voluptas excepturi aperiam. Vel architecto veniam quos inventore. Impedit quos rerum distinctio. Qui consequuntur aut asperiores.',
                clientSecret : 'rxr5kdmjco2m75uf54buj2i9birh8ddit0w8570lidh7m9qxgjb8lvjz5izqsw7hr2z9cel5bytnn2xwmkdiipkp5y',
                redirect     : 'ncwexwaw3x65rgjc1x4ns2xawymalaqn7iw90o9yhwmnn8iwtyhu2fstciple424j34rio1bcwo10ua087fvs5294reoj9k35jk9t7c8ip46zrwdgz1wq9mwaezyod7414area94boja96ktawlnpxtltrk8ibp5qajqv5yqy7uqfv5ydktx33rte9pi4491k2tvr5ft2252tcx86t0t780uxshz5bjb8m81eyns97i987si5gokqn9jrbzfsqn46h2aj15n48a3txescd7epnykopvq0wj6t226zvjcewv7muawomvm73l5jzhyvcu1707xz365kj8882zqzky931339uoww54hehmung3uxebacjdx8h8xuuss6kkfrk11wg1wekhwn98x3cpxacw9wvznmnalbehbneone49bnde72b4xv6l5tjkm51ee79m0ime558i8e3yuf21k8zcdbtnuolman6vpy27o3l1wkhbksbc2pq1lrzhjm06sogcqerv6cpqtve6yrmhj0vkk2x2rn7zx6x45qnix8ucpzi1r5e7xc0f2u0ny0676r6qei9pz3he5bziae1n1dwbw41chmd9sm1iods98s02s4cxkoz6v86gh7i19jo66odrk9iogsbhzcu72byw0mjy9vpyg0h6w1r4vckaref41yiuyiynhe413ehv82svdwc23lyzbuoh8h5jiwncpz90ms5po6ek1jx0spjitop9vbqraapcw4wswd1wj2upqulaylwyzt20h9tj39chbda787u27f0a42ddvr07yzpcjhsx5pm65ncj908fwyfa16kyqu10zxr40x7u6kkd40n12kefrqc2q6wwm1m1d13i7polubaijj5wvrikqe0vflfei06o9wkcetc170nv6cclpenzex8k892p47gfm75siol6mbwa1xavd22wa4oppipnf6mm5vuk78z8nodp5pii48kx2ca30uc10op5vdt5erhvdbkh8g5w5ftv22krc3fnskzahvc9gx7w0bhfw6vbl4ywhxt867v69pz1wd4brnbxq0lshlqef7dzalm70u2o2zq4l19k4p6wp1cf1469anyhq9a3z56ercuimlefhi45oxjf88quhq5ix0eru4ejqsp6niryez5rwgb39g31oqcsjc8ilf4polpe4gq3q1cy9b3d462ecs9c4nn1ha7jthqnzdeb65cgf8sxkmto4wybenphmp22x3p2gzys2shy85zblu4dss3286u36y6oysf74qq8c4ntkfvqcmq5nygl0et8wz672k6oh4ilxx2xfaibatcfd8xhfoywesrdyriviojk423r4ipw6gmeg7anbn23jpsngcin8kwf0xdck3r6i793f9ctb7hstgqh56gacbmim26gfttaipyeqhavpnnfdpghsffy8hfpqp1eh46vp6cjl0g1745s7d43h7xgyeqb9yyb0pdh2vdeaf2ksoj64mx1udrv7u30iv4juzqlk2okcavzq7v4k1idum52r9kq6ahqu65xos773yhr56la2iquxfbhfcx563syrxgv5lvomrt03zgxn9nsajis0b78boe8okilgg3kahsfyfeluua82l7mp9oje0kcdem7aq4iz0cl9vvht5s2wh6qhwyz21rwncksrqn0hbiaw585mmrxb3tx8qjedp8bkh86cbufb2a7qglp295nsacq3dsrs43e8bjfew2i3fihuo0oslzkhxuqus4mt0rwngddtkis1fcqkairo1t67t91zbpdny0m520zknx6mx8ew4c7qnz53nyakrg31l8yvfr8horewjcwvpn015hhtvdgxi75m2nr0xh66ma3wq5ci4j7p39q5xq69wdheg70rgig1ql26o1z9r8hymggpow4nwoxie4lj85l8u2hljrng9jjeo37ldpmm4r6gx31ltwiwnu78u210glztnreyj7dvsdai4m1e46zp3w6g665xv947gafyhosal8doijx6q6yf3gsi85t84ifccivv',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CredentialGrantType must be defined, can not be undefined');
            });
    });



    test('/REST:POST o-auth/credential - Got 400 Conflict, CredentialId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/credential')
            .set('Accept', 'application/json')
            .send({
                id           : 'chl44qsuqpvhw6yk71rqp8dlzq8c6c53tjv1w',
                grantType    : 'CLIENT_CREDENTIALS',
                username     : 'adzya0cm7kuomk1ayjoijw1s95o10z475c9ynfz7e2sggfv11ymw24meih6rsiypayfjl2yvkxjy2nt065oogjeal5eefupexvmypvby5joyx6s4ohejnp1d5v8la8ay6xtfb9m6i4sz7mwddpf79c8uu7qegjbtc0l2cp3yt4028xykfrkgkc5eaib4amp6jd07hijr5i6kdq3yjovgn2mmpyznf4d8h0rqlhy6ttalp1b9jiexfnbmp81pyjc',
                password     : 'wajurm5j8n2pkw60vtok75y5ly1nfapv0ko44obvvb91cct8j835watp1w16vmpn4ps1tg7mefbc2a2pgx4tnsjwr6ax9j5y50qcbdqhycyal4my5zz70idw9tbn3vsmndc8ak8jriz7hv2b7mr0nzcpictbjjhj9gklfim8vfdmglubzmybdwdr70f7xc1mkgdcwet696889v6ra4v527nc8i7fy94q40vnq5l6q63q19mfq2jqxmx43fv2egm',
                accessTokenId: '077e099f-2640-4f12-b1d8-eef80ee8cff9',
                refreshToken : 'Nobis tempore vel et. Nesciunt aut et qui qui dolor est blanditiis. Temporibus et sequi. Consequuntur veritatis dolorem nihil magni quia error. Commodi commodi placeat cupiditate molestiae veritatis necessitatibus. Officiis fugiat fugiat facere.',
                clientSecret : 'zepaxp5ujmfb51ken45pxgx1ycrnlye3jtn66wttgbcxa54q05r5wchvupdmdf8mdqgkj1z12rap4joxbc8p0fdizr',
                redirect     : 'mk5rvm2013fzw9x6aslvh0ycx7mh1y2ihqjhvoydmwpuitbus9av1imyqx1os8f48mvb33wbwn2hqsnz6hqk0c32pw0e5cqz1dh9dgtu2wdkoqx04ug4tfwlsbx4ac0uib23jh7ojn711ye9ovwo0zc1znb72v1e54q1ksn6w75hlg91rp2c6j4fvqh68l9ej3jezpvdeuiwlkrc4kxop3l4xrfw0cceocs1xe2m2cmzdioc0t7tvfhhkey10m30upwfny66eiv3enwgf4qy9ic0tipc55f4p63nq8xpgva7m1fma7xnjx526yv33lg80zf51r3fy1swjhh0p0vi38tnm2e3c4shghy7djr0bgyuy8glxu10s6q1yx8iee7fwng3cs9dzps956gjzh85mq8xaoli6pboncwv7owlz4k74zg1sifxp6voaedubn1rtu9apsxp3go9bud57ypb2pmy3xkq2o9wxhye0zqmb6x3rr6hr6flutwduk4hq364kh69hnrzoj51ecx70ule2r0b77jvqlnvlgroy54wasjmm7vh682och2240gstnv4msweq0xfscnoj85ynialgd2upawvr0cgyszwmqplkn8nj9iv1gr5w3fq9esxd4gr3q5py0oqvu5giu39j0kfry9qbc5stvz3ikvrmjxvgl57tzxsgmpegjf3gzxsidr8frsjcmdsh7w9zjybkl9hjzt0p4i603g8bbe2edbcy7r54uz62sndiuk39moq0856ulu9oqcer40ews77iqvk4zjmr787jf3rclohsfjipsz098tcnkd34n6f745e4fs942crek27jmxuo4o1n7ma0svdujv9wavv1wxe3q7ylr2c6jezqnz8jv8is1dcrqpls283bfeuwpqvhhh372v2c6ae5tdqa4g8qd1xlxs16obr7s899pmhsig3v3yo3a1lic52pzf639dgome6fjy115qrrfml79yxqqy62kclz6g10hj7aixt1uqcjxpk2xcligs22mdso563mcyffmkgxezdduvguzi67qlqkq2a9t3n0iznxjd2up6x9246oov9p2j10q3chn0s2md7hh3ea6tvbykprrsz8ivqnp66aymskc48l76xst7gfk49e5jcv1dkwj8f1x7ezmjhkgklqt5urnw6zys5cpz1lpnpv2wsqmt98ob6i18yq9p2k0yxh3zlwi2m0qd3yyy4f8h2rbiik7n6ua1mude45z1874yu4m16i6uu8j3dxxsbywsxnshx3dpfqd2pzbzctne1zm26afsu4m19jdtaw7x8utu277l791kcg8vzi71yyyhlyhj031d0frb58il7kfo7j8lagp6xaf8h8vbqbo0o51kltzmn1a362lytewkvr6ly44j9ffyvazxccm3du0ikprbucb74ywoq80cnulmmq4smdk2qsp7cf4op63ah6423w64foycnp3pdqkyh02a0kwfxx7tnywlha42fs18tjxotb8czn10aq68wctygajqqs62qar44byz94u6ebxusxsv42j5kiyxtsd3jyg67bo6awob65s6bjhjqwwfreosvqlc554103s3to71hrhrls68t800x9q24oyni4kloqmhimcdoxg4x679gurumkuh3rgmcazdobq80q708f2pqz53wi906b3mb4z5h6rj70il2tyd29vufeu2r025y5gywv5g8l3zah9upja9ikfhsku48drt2ug6vvrijlzhi91t1oe5czq1lkhcjdu4ojcuvqmdvbpmq457u2hk1rai9841rbgnro5w7l0pc3osm9k5096uh5sugvtad5kj9a5tn3sdslrafnsfiy7j50t0ln0do56hfn6f1n9sfrwz7r7x5qrl4o128ii3837x2rw85l81jsnmvm76ndfnsqueonp1c8kke04os20nrplcu4l54wdbfbu0gvoltzls6gxqge3enfc4bdl4s8r43owoncvsejw3dpxadxadzfjytjiu2j29hot0fnppvwb8lv8hc',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CredentialId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST o-auth/credential - Got 400 Conflict, CredentialAccessTokenId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/credential')
            .set('Accept', 'application/json')
            .send({
                id           : '7683f8ed-b151-46f1-883a-cd529011c4bf',
                grantType    : 'CLIENT_CREDENTIALS',
                username     : 'm686a3x4en7zkk01al7fo0fr3i31sd0n4qcb3epbasylslvewqnjkg9y5h1cchbm2y4jj3fxjhmu1m0qbaftqyh9ivgcqngugss78nl3ru15rzr6wurn6kvastzkxinlkfhyvprrhjhpfw082oy7axx6hg2hny6hf7tazcp32zjkc5spzgkbqrauxb86ef474bm7topln2m4fhowzxbbh4zepc52ciybfam1nuvghvcd84tbnhtnykks6bawtef',
                password     : 'pgxrnr1wcb475zzkog27n2uklniob3nr5xjgmu35t6cnnqy0rew9q14wk6h6gtbnb2gsez6igt9g5h20dzh1gypgw4jeew2stw5vwffffiq1vjargh403dkh7g0cfck6bi73ntflh5ijzjr6e88s3k52yg58wj58ju0ixw8vklc0j2mpk6aa6z6u6zl8qy1kl3504iaiv77ljiotwam5r1kbsij6mwlotmxstquh5q1va5flrbcrv6en4h05zrq',
                accessTokenId: '87yoof8v0l3nwdtr68w6vhdm7sorvx0f1bn4l',
                refreshToken : 'Perferendis et error pariatur in inventore provident tempora. Voluptatum nostrum nam dolorem. Minima doloribus aut autem impedit iste non adipisci exercitationem. Atque nesciunt dignissimos sed in. Sed veritatis est quasi.',
                clientSecret : 'kuf4ctk52v1ds3yr6ln1j9uqqy6kf7typqzotmcxm32fntraeueng7n7u1bgjpwjd9tkugl3ye6u4h7mt1btpqt2dr',
                redirect     : 'im1rcxb0lht8zl6lg7x473i24wah88nyoituo6ixfw5tdgd9fer8gcgvbo3kgmfy0vmj87uooug0qnv8gmxcyyrsz058lkmxco3xnn84sw59dj1fsc7efivc4zr55xepz5v6x0q54h35rigpj66frjs7i0p3jplrjymro5a3pmcxktng2bz38l1ll02u5w0lqs5vvr9h1ptitb5c2j0p8t92xsjfmwjdtpi62qhdkn0z9yseyxkwjpa583w1bs4ftjq7y7ivwojhyulgmhjnzgd3njc5k7ee8opn3h6rdrb01zowjlk4zh5s8h4wclpryfybgoa3wyx3c0z1389zzi2euv5k1m7xwbotm6ooltxa4xp1tvo3r96mhr8fa5f06g6kxw1qutz8p7lt5htsxymjo6h00v6ua81r3vlvksq36f0dhkauumzbis3100ruvtqwqc0nmkkkepqqqj8nzpbntkl3b9o1fu6t1k04hedgnp2adzwo0w4hafnr43h05u68cium54stm36384yf2e4v9zf9r6idvn0t7uwgvjgxkhoucw602dnho5hdn91q2hrovtic6bptulwawdui5gwf4hd18jqaa4x8qb832xz2jemkqlfapr2de2fbjp52oost6xsq4s9brnlkk5fa7b5f20eciyui7ph3dwxub42w2lrlyx4hs1s4k0rcw1pgnc7s8027j38p38gnx6cml6q3agqssc0gyz5rwelxi3ufd48k9njihrp5qfal4sxofmtt49k0xrfh8el9i512c31vd13z8zuzau6xdv3uvth3dtvq84o5dxylptb25u1yc0edpahh2lglxpiahc37vp50feowgc6bcewg44i89f94yd3kxy3d0chpm8a866x4y8xf3pde5umg8bm7e9yrmrjbr59hlc4ka1td8j9ovep1ijhe8ryimp6n37y0hgw9mszpmcx0j33opjolwuk3x6w556o5h7j60nsr1b2ukeqzyb388bagxlzmtehvcwq7hzz7m0mr4lkpqcwnhmlw232mewu4rqv9o238q8dqurz66b4jsekgb8br1zzrnxxjxytyatjfngvn1a9dk0wnoe4a07eqeg1cdvus5fup3x3qiq6ppn0bbhfohd4wfpazgch0eccgg8j748guskp94uarbk2is7c0lt4ofh2zasi4djf27jt25pe082gm8fssm314qnw1j6y2w4mdotsew6dq1jolh8d3n9pev2zaiegyzxsm7omkpayk0w1ufs6sqwgxd97khghug9ry2qwnqidg8mqkjz2grqi0icp06fo8sc0iq83rg70n5ly53mpn9cpeojzwrd7d86z1xq1cvov60oz93f3nhjjirt5qtgr5b16iecxmior60s66th5nf9wtbtt8if1lgr0e7oktjtj4cek63nho1rex33ywfmcq4myhz4qaqv5q91xj8h3fsjvk8uw0dab4s6zq50xrn5ksbpii64bldm5mlv3s8o3zta4xdds61pd2vtrizhrvhshjx3ak8b79unml8vh2qvg8nxskcnbyoz37cbj8df1rkvdygt5nmerxu783l3rez0m7egt580v5vhba5pqnw9ez5n77ua4rhhlx5scez9ieeke939shm72xhestg68lh8gxmk2fb8cn8r1vtfz1tgk97iu5xmryu4ctgu19c7h42r6yc20w75epmkomdah4ow9vpqg80ia3xq73xccx4v2f1a0ahjwwxwbam0v8p2yhj7jvl7jmis6u8kxueibmydgnmc35zt38mahocl79sot95d5333mugiy9bk5g03c5q1c25xkm7fyb6dl87xxju0s30357ai63s4oqcnxdmbaq26t826p74871uucgjnkc7pxpzb35nvc3v6tyha6qccxwklhunvzov2ec4garsc8ou3tstf7u3k8x97cd72qefcdrq854bibibi9nd1j7kou8g8dtgs9e99rss5qap8z73q1znqxs7p69gpj7gjlck6n95hio7zsyqwpadjrk',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CredentialAccessTokenId is not allowed, must be a length of 36');
            });
    });



    test('/REST:POST o-auth/credential - Got 400 Conflict, CredentialUsername is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/credential')
            .set('Accept', 'application/json')
            .send({
                id           : '7683f8ed-b151-46f1-883a-cd529011c4bf',
                grantType    : 'PASSWORD_GRANT',
                username     : '1h1f059th2djc3c5ai1zmeadxx66w221uf8qair8cxw18qpj9oboxa0uylfj6igyeomyldc4me4c5oj5bftp2lsqzvl5fnrt3fwhkixpp5bw5xeakux50jgvy5ko5zhx9o3nkn34jy57tmyfhcrfew426h81qlc9nhjuyhjiq6fp5dsxnoc5eg7bqmijc6ccitpqwvhogmrui3zd4qxd42q1vy7qc2xudtlje9984ic1jklqsw2jichynizje6ei',
                password     : '8g6ue5wsla4v5owoq7gv1mmpso1xheqzkl2a36r4ridepqsjij5qdqurja47e6wa7y2wbipf3mi5l2jc4x73jiwyi6511x09b3fci6xi4isvyb25j9y75hzzgxph7enpa6bm0j1s0d53t86lrv8pgschaxlgjidy9kf0cajmpo2tigkjq4g2khct2gus0s3jswshn7k57yw597l1iw8tm1tauvz9wioym28egzbpuo5r0hq9r3djdjus2t0e98p',
                accessTokenId: '077e099f-2640-4f12-b1d8-eef80ee8cff9',
                refreshToken : 'Repellendus distinctio aut quo quo eos velit aut dolor. Sunt suscipit quibusdam tempora qui consequuntur omnis. Amet et eveniet aut nemo dolore rerum accusamus. Quae laborum dolores veniam quisquam eos atque ducimus quis qui. Nostrum dolorum est rem qui pariatur minima sed sed.',
                clientSecret : 'o5xboj6icknil2tyzgitnnllo0jca5p5vve9x4k9p49uieon9rulfpjlehgb2p4eexiz8mhgq40ipjb4ta7uo8qblt',
                redirect     : 'fp3nyv9e65q3fzmsbi4kspobpg1u80rikszmlbl8t65ot29pzzuqotga444jsg6x01gqn6celh8rwt8gdzfwxrxe6mv8008tmxsjenj3wdbb8vzekfzvlt5iersz1x9dyzofmbwa6jrdrq8n5xwdwy0htfybvh4qbrb6ni5v999e532yjxqkhptvurxwmetx2u7wji0mk8e0p58nez7ate3lg5g6yc8a85adfmgsy0hnp1x3elvxfc2ujy6g16vpmczlsurbtwmxnd1n6t4tlzsj7ko29qm80gvpkt59788h2tqvxwn9q4y8dmsy7xnhcv7n7vrfo6vlrwg9zb29qrgrj8uza9d10gy6qkhl2gikyu1pdm0yet327lhhrepqugg0hsq30e17z1l4vy4kxya798anigor5dyiie1k16j4ox9tc56ev3d2zddcuclrurh5rv3lfscztczpfmgj8kblpfgujugl3fpd5924wxnd2mpwufe26r65csoc5ebfeqemd2r5t54irp6atfh3wx11xr3dezpdkalurg0omrh8edhkkbicv2r0voy894a7ji4d1f9ce7vb03l4em3t44ttfywr171o40w4t15lj5a41auypa52ximrv0yget1qtvf3o96z6eoy4jn9nqnkv3w0gsxetxd2x2cp8am0v4rt7pzmabt5q8rvikutjf3utxunmo44mernypi5m33x6ri5z3ruz9260rzlogmzzbxk4irfgv8ftz4ksq7tzkhh6urrxmcnuua2twqz6c4ud47r9f5xvfsg4uek5vlb7pyy1w04qkgq8nh3noaezi1kd0rr1xlpmzccf3qmpme62qw0eopz4odpae17hhlngpog0jlc15dos71942r11xhu1c1u99elkdyv5w1wpbgcfjn7n59633abctzidoinccic5bcvxdcgsj2ybmx7xd9iqt3d26qbw6kwup4pp4mqeh3ugteh3mqych3t76x4r8f1ebbq57t6vb1vhk5zi1utwe64c1xcrc1k31bep418ufv1miecqgs0m9hbvayixu01r7m5ab78ysojgxe0g0ybyvnjnwxbpusj2t6z3ks6qoyaq63gj9hw55mcfzc7weul1bzzh0ye5zsptzpwva6wf9a04a7ap7pobohwr6vkt1i40fg9bush0tfh0n8pkgc175k66jz325jourt091bad7066xia51l0evyht257yvwk2vcs5xxyuhbpniepgksyx69ds744lq3mhsaknqh28z245sgavap1ovoer4d027qeu8allm9sshqilgw00gnfioueb6nw2j7yke7z0jhzbq1zg6gpen9tg3ifsysgsiwgp6hivdbkl0y3ydrd3jd9xalw2p5pb22326779zzqwcgzbr9sick8bf5aetty09pa464jeax13mk7dow4s5rjdozewbhltl7cvczc0e3rhaqx6arhiqthnmf3hydkz382jsahx9uk56mprq6w14k3biad9l9q51ngj4xor06jgfjp0ejs6khde6riwsc0b4enechv3kb5pkuusbj1yoieaomdvrlv5lfa8oymwen68qhszr4xk1brblt5ovqvxdv01ss0tyjvn7arnurk62pqsr8ipbgevb0jqp340y9chq8nth1xk9k0e3dp2p55y7d9gxwjj5d33zpqny5zqgvpx16fcjknbfdrjn3yldnclj3vuz2srrfh2ot4fkzbtcc3627wvcsyga5q5tsdvt1fku3kqr1t7epxt53fkev0o4ya870gfdgyjpa7juqt1mrtrhpvfm1v9yxt9awdefxrk9ebyj25e887xcfz3t03m3mh6uyxo7bhtx1a11ocd2dikymldbk0dag6ye8fvxy81f0fr1djsftndwvrvhzva9zihyg50xabqvft3cskghucuanjax2930lq1fqnqkj6lshf3pdvl701wuft8i55d8qg0v00yy9vpv5qkkav896wd0j7okq7qsv6sv872jzej08cr9m5ewy6yenuoqwz',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CredentialUsername is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST o-auth/credential - Got 400 Conflict, CredentialPassword is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/credential')
            .set('Accept', 'application/json')
            .send({
                id           : '7683f8ed-b151-46f1-883a-cd529011c4bf',
                grantType    : 'PASSWORD_GRANT',
                username     : 'u658or9y8uyqji3x6a9zne9d9sp3m6nxb4cfpxozltijk4l3gjirht053p7xsv5syc5qn8i0hr0wi19zyo29jmnl5hxtw3jknmck47kflvi0mi2f1a1vmf2oylwrdezczomjikbwsvys2141gl3yzkughuiw65nrulwelqomzqb0emlbsugvewh5ms4xydvedxj3kdqrd624vqbly8tz8o7svdepovzc5ng5snylp42zbb9bvjd871ynaz5ndd3',
                password     : '1ntfa3ogfzaniptsqxyujf0ujrwm8dwyztfdbffdvd5jwdyi1aanc9jpzdjq077x8hv3orj1vx8w7g3jv4m0p9mxvzinzj75oahegqfv0kr6nrqe8g1rnntbjdgauypj6e3kshwlquty39pcklthhui01tlvadsubsj1s8bzua4tfl5iepzdmu9hjxo9n3w9rfyhi0gylc4n1wp8oq71dcspgx0fftrj45tamlcl5gi7t2e02yvhm50bo6y10rfh',
                accessTokenId: '077e099f-2640-4f12-b1d8-eef80ee8cff9',
                refreshToken : 'Velit eveniet hic voluptatem aut eos officiis magnam sint. Quos quod sed. Libero vitae quia fugiat ut enim consequatur ut. Veniam iusto aliquid ut laudantium dolor amet repellendus provident temporibus.',
                clientSecret : '79xce2ccf9clgd9ebc3m0ik56zl7fb1ep2c3oxu43enzzljsj3ua4oi4cgyozyjnehh24ngnng3vm0cfo6mh1nnjyt',
                redirect     : 'va9posqskcp7b8w3pcav7wduriabhgoppu47iy9dhw5ttsrsfj8zg97nr14i3d2a3gga0njpwofkmfpjtxg984tpno0voj8sneer7hxpzz8kdy72qhqvlbf4paxvvjhwy2r5zhbg4zd4fywsxw0xptnp7wemjdsrkndgrc8zvfbah0yh9pk6zdjfcr6h0kd0z4o5kyq7y2hfsrm3b4qtvo14ewidlv2r5n8f47v34rs62kycf2zqbysuiu4gcxtrrtjiebp613cte76gjsyxt90im3cqp6tudiak5uqk2zjdmla6wm6u0c4ux7d7zhtvyc4s9fdrp6c02giajgni9pbesg2cqt9q287t5941uq06psf3c9oxr7xmidaw10osbmib6ehspjqd95b9169az9fad4vi4oti0yrtch38h10e512zfb64apy6rm724909xomdq8q9ue6mvgusj5l0kgu9ekb2wgdl1snco3648kfdt6orioabqumtvx877yrdss67m96x2st0uvfcknvgwlwk0iutyd9fssfp11sde0vrwbk3r1zc09l4pcnowplcgk2m9d19uljc60svsiz71dfvtdxum7fu0siauo5kbjd7lql97lvbv15etgzk4feah1l2w2lfl8lgbpbc8lfg7cea4mxrjaf13efo8r7kpojxufhrk7dywp47mmfx4u6nx05ydwgnouh8kyfyqvr5p2v9jy5asjo2xeimnl8l34y3c8rrz6a11fvtj3ko7g2ak7f29y9w1cse8v58zmxmghs8naxsz8brsfoi3as4nz9iyw6lcmhpa1xe1uv6o5txk4w9z26p8es90gaeaumaptmhq0kpj7xqmr0vn9zdht885fxghujott03lobh2irvtubfasq7u7korctgee4sj8m2pfu8k3b06d3lu5tu41pdy2atwa1n8c38u0yqjd0ehgcsfxwl3c9qjq8xl16vlsrw3q9tmj5co7qi295xczcj12gya43wx3sdmtc81pxpdmq0i6fu5dtcvqmcqpxvlumxnkflzyk8twnauiyefq6d45byr6wsv0qgajn329mgutdez7x9w41wwgklqg5f4odlw7z8rvu8ebapwa3zka0pcklhgkgq4d7tedzxftq7a2bgezi910vcchtkvrlv1mmcdjvowl1xlxnc92h6jt32zzsjgoj8r7tilq79yioqn7cgyodr9zprctzrm9fc6jfxaw10uz8ca5won2uo3krtquougkqii82tbqf6j2fl36rmo4gl2dwk83ikgd4k0ow3bdqus3p192uvy2lra41jalfger3v6ri2u7hl37xb4xmd9a1xj087664iouvnhpbodzke1j202pyoxq1c2nnwqqjhsj08dqlw6e6djiwo1d2cxxgljb54vxeaian8s8oj5vr898ayjv7eqrmcioui5g5avm6y0lxew6uyl14wkx50mg24ppq0r29ar0202s0psbt2tpbgfz996sbm637l7tfqgtxnd86qlnddudmgdyf61eco0xar4yx9051lh2lhqsbbjxxkpg3sz4t9b2zhe3q75r6bbz52ppo9qrafw51g1ei2por41m1pbz1bxiywvr2n4jj999a71afauq4fewhhk2g0zlv1ku6ezhl2nf5kh54ed5h9by4hxdppm5x3j5ntudmaytyva6qm2xuymj71yyojaa66478fp76qhi1zgn97d1526yo4kt8tgjpthi802v10qsr3buoxpptnwf7un7xypfy78s160jd4e8db8mjf995bzta8jg9oxvm2pqxgkerf8s6y9ew2dxf461gxrmbx8445b66n2ooqxoq2iyh67gzf22qddkqr9hgiwoswdvls7uhjitsmqrco77b5e36zu4c862k6831y4wk946zs5smlvqg9jtwduhhc627av1knsynk6ny526a36ne9zx3y7wxhwylaj0jwt20up9dc932bv4y05c0pxor8usw0sp2hzdwqhi6kwiaycso7kd0xja6acma7cove',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CredentialPassword is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST o-auth/credential - Got 400 Conflict, CredentialClientSecret is too large, has a maximum length of 90', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/credential')
            .set('Accept', 'application/json')
            .send({
                id           : '7683f8ed-b151-46f1-883a-cd529011c4bf',
                grantType    : 'AUTHORIZATON_CODE',
                username     : 'n5wa8ah8rdrx47k5ks8j9fy1dvy6kwwsza0r987adx61nglqkeo0ejwbvw4w0vdyqlg5acb09ptui30l0gd6dsd6dew43fz254v3mn6ajxkmklyz40bau5wv1ekucl7twgmwoob5u4y1wnkiquynlrqvn4ukz0p4ra5ejga4w1om2yftjw672y3xcp0zvwrgloyoyl9177ijk249n2uim9sibh0zedabe9ih82tykohd5ry10ph1ykw41edcgjp',
                password     : '886aheco6jawy8b38nm94zcxcknbnn65xmb0keqaz3j1p6bwms68fq05j7prv1i0p63okv2nrbryxxaue2moltok821axp2nlc7az3qbteeaq3hntlpkchczaq1kop03qy9gh0i1nsdbj1pfg5ufkfhzd6ambvc9hwyw6glfqrmtxim653fagmfdp4k99zq6jqqq49mq2fe2voxytr2dc3cr50507knb0monotw9rl6xlco6yfn6d7742tpqvoy',
                accessTokenId: '077e099f-2640-4f12-b1d8-eef80ee8cff9',
                refreshToken : 'Omnis et at adipisci quod incidunt reiciendis. Laudantium eum consequatur dolores fuga perferendis esse fugiat dolor. Quibusdam veniam ea occaecati. Qui suscipit qui quis dolor. Rerum ducimus non molestiae. Recusandae distinctio amet.',
                clientSecret : 'hhmm9fdtbm09tmppig3pu3pvtrdw9d3mazdch68pof3qx6fx9ckgrkdrtngkjecwzyb8mq2tapoz0vlupzptvbi3oyy',
                redirect     : 'njen8wgl4ufpe5nexi1hj5ev0y0z4m5adxcgrh1mlqopfz6btttot00ds0z7udzdnbyj3fxi1havvp2mszmy8lrdwllbamrey477a022f2et3ssl5s337j89jxy9fo9wbcpxuwqosr0tal94x0bc9rcmrb53c3lr702fu7jpfdqo9jgao4k0gwlu0o7epdobtcat5z3bb4jlb8q5cypg3xcouu6bvnekum65lnzxbvxz6raxob6veidl71w21r92yheem3a9ewtyh1m1mlw9j9mj0l9a71y2pilldevvitspb009wf9i85ht717m2pnlxalp7yuzo2zm89voa4x4t7f9ovis519dye535gcozbijtmop9fipg4dvilp8vdh3ize6qqsdbr5pcw7p1bb7squ87z5dwef99z0jzsc6t0shn7o1lzw7x6ykh51y2stysnhclr7rto1532njywxfm4zgsazgwstg3aifejr2gt6ynu2dyn21acyjes5s3mywfcfsn9tvddct11tn5ladoqgs7l4x5t8df8sg8y764aemtt78m33j9i55ogk45jivw32dov4c14esdi46p53rxcnd6vetpdhe8u5cnf1fyffabuahxcbt0yvb0km91g6fcsq0v78ed48oown89rowhyqucmb4rcgdo2dqcyb9jwg5joc3oq59dx8x4lgtxksr6aucv6y76o72eabccpp1y99ennhsvg60qk1os1dbkzi3dxgip7bles50zgyno6fwr8nz148knyvng6medzjabitkung3x52zxcwmiiqvgu6mke9tlq0ru6ncc6f1vc2wrlqpxthd1rj5e47ul311e01wkfoyrxjj4vuaxzdkqjbtqna3toyy63puliegthq8mgexu6ddwwhfy4okutfjvneysrelglygd4klwo4aloz0kc6yivohoppudi07c8ohwbil60xxtwh90323zzqpdf407d5idn77pxi05zg0krw2kfezdglahdyure4tt34wnwoeab04g2x79t9tyr0nal6judernv761et0trxtpdgw9jmk19st4sq581jx6fo3qzxeuw50gx837y59ftpytxphe50zcjbkz8o1s3mtk6sdmzs95vzfscfbyxe49a3etizrm0ycfz57h1atvsc9zi8vtjzrcp1z87oyi989orlij93j8rla86siv3a3a4b57hd1yz0rlalc9w28ntxhuvtoheqags63op41vkm04otxei0h615sv9d6cuv63qry3rpy5qtmj7oxka58wx1mefc35o3tn4c7h5avgt0oibmse2imjkluq3qinq84byj9posih5ht649twoxyswp1nvmlbxadn3djn27yg2mc8i7zkkfbf4gv6pqvjsiqyanhcd30e57hbckaxy636fkwngg4udomygo1jhy0cp24e3sd1zofq1wyemxr44awl89szip3l845f4hh16flm7fxxz352a051bokhtyalgdo9ptuw5aefydcsue8exjr05n4n9eeyw57afy406tsk2u9x2jhl4tf107yfswxtc2v9ait7xw774ug06jk3ycdnuurbknugdmzd6gmpdkxlyfta3wc10gan552cl58w90kdbwsx5ntgkx88qh92h92vedbt6gylq4gaqheqxdwar3hcblvlnwsf2gqjbghkgzihml9kjhvcqo70fonrfc7jv03d7jp6ogxohiughiu6zru7etb81npr4240xlgcb52jy2avehw5m9vpoa0hwk96sbh8zkhzvzvgq18f4il26pai68khgjh2qh05i6qpc3kxvwe1qe58lgd28by4w1tu76v27u8hk8iikzof3oqufukihtdksbwjtjyv0qd6yjkamt1k6dloh90aacozmnfljtmaqayk9ip4rv4czlbteyrolbt5nv2bxia0z8tc3cq8bdbpawtpl18d9vkmhrd6c0n6fhaok0bj4gyrbw7bh5qhh1ufmiti8yz5rcjer7r52yhfeulpzjrur8kuhm8ihw1',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CredentialClientSecret is too large, has a maximum length of 90');
            });
    });

    test('/REST:POST o-auth/credential - Got 400 Conflict, CredentialRedirect is too large, has a maximum length of 2048', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/credential')
            .set('Accept', 'application/json')
            .send({
                id           : '7683f8ed-b151-46f1-883a-cd529011c4bf',
                grantType    : 'AUTHORIZATON_CODE',
                username     : 'e6pqovgblpe7yfcug702sv0cy1c6femwkeg1ds1tkutplv3r6n9475i5gama30br1kgvr8c8fjgtq6vf9y31zw3vv76njt57m1u2e40eao5kramoycobo5onbja12cc3s5gqycg7t3squ2ca13gxu2v2jh7y0fh7vcge6e2eiouotmzs66ipglkx9x354l9nutru2g0flv4y2wv2tcye3rw0ehl6mjqtheutdn7r59r88mxc0u6n8710r0emt1n',
                password     : 'sxajhcwjqz7y69wqzh0kcdod4wxsdvem4gfsx8x0zowd2o282xtgjnqdl3pil9l6nn6abo54bbc935ypmivi6qwt1b6yhtksyiqwhpqf6ylz41x3ajxcrudi7dxgrg6fb35ylczzvnsl6oawni7wejfsi1ix9ycsekvkspgnk68n81jnww9icfxmyqc1myvvbw08xbnvvftebcvw0i60li55equ42r85926t13x9yqk24g7d3ep2dv4olrj0u6r',
                accessTokenId: '077e099f-2640-4f12-b1d8-eef80ee8cff9',
                refreshToken : 'Voluptates exercitationem ab et aut officia natus commodi velit aliquid. Quibusdam deserunt at. Quis et molestiae animi eos sapiente officiis. Quidem fuga animi omnis voluptatem veniam corporis rerum quaerat. Quod voluptatem aut eum optio possimus id pariatur et non. Asperiores reprehenderit eos facere ea expedita voluptas voluptatibus qui.',
                clientSecret : 'k3mqrq0damfg75f93vb1ygzxc6ljb7p8bl35hyfjwir1xetcwds3yjfdndz8dvl6tfku1mk691l57e98cyb3bdkb9u',
                redirect     : '8ghcg983tnng7phqlf1psyzsupszko1n4tzrsh9x4l5v2xeeilmqxb0jhp5wye42colnhweh9nymzdn7xt7wwb34egne02scc29x1sjh5dn1twtx359ozt16ogn9dzc137tiw4gx3dr5tkj2nwdmhxktld22soh29a96m55qiz99401t5l5a5ydk1gppi7y00t0wzarndv8sbdnz3kt7gvl54acr5tmhp3xwashdv415a5rv5ze8ti93p14fuh4qv5uqaj8xpffphz42kk9stdbhklhsaun4jzi7fuvcr8dwdd0edvv16287mpiva0utfqmzv2vb4unls21jr7cvn1lg9lxg280wq96a639nsyk583yqhxnaxt4nhag4g3l3yjx8fhwxcf8a2ltqlg5h9pr037yvqneof0xpxccjlctr4hdh1680ghgkr5k9sfvsw7vtjs2221wjlulljstb0l8podap13y5js2e0g08vntcfvm4bsox0y2zvfvlh0tlk62msk0nbi3an04z29bb22bphx4iyu33r236iatn9asoj0qr9dp3cl2eww11yteqd22ln5kdrzdyki78ihb3gxcodbzojh3ve2f5nlamc1t0jg5dyapf7gyfhkc4vce7x276nk8vdaal52c9zgbx3uzt1guresf03a7nz92gj0ya6vbg9ol7nn5bor2wux7w9lby9ojsmhuw4dc63l1lof4n2bqxk03x2s5961syccyumy6qt2pcph9jw1bsv6fm5sodwf7s1ea1ely7x3dlb29t1jfnv2hmabe5vi9j52bfsx559o2eafn5u128s7t7xe0g54cfjijdmsbz625v7attov9334ptp4n7eiyv1hvog9i6458z9yof3h0iran95vop4zdkgrg2ve6pz6errjrmxw77uqeml0ljn4xih9h779k4s49k5vnx44qzeokymz8skr8dzobbt4n3ty1u06uq1k38hdpbdjxj9j8wzqf4ll2x5qupsxgvn6tuxxby1c4caxm99ddpf7omwsea4jp04zmi8r3icquy714ck8bqeqzmbmj9d16bqgm2gpz5l56evo0ssu6x65b29f1xv9787w12plt9botd3bgve60flgqxf4xecr4e3cr17gl3f0rhcb0k4b9lhdsuq4mqjtk6yxwrey16blbb9jwp94ykduu93mnka5g5aisu60dufwjs8ruh3ycz0ponajepe113rrv1qzqd48iby72n0js7e8ba9m6zumfkueyhwixz5efc1o8uomxedcsj9eqkfqo2nrnzx5rjbb0akjhnxrw7qb75qne0apaj5q5uoquw7piwtv8fpa852swe5l67l26fdcp1t1fihs18fa56iyse7644d1ja5b30r8jr7u733mevbrm813kj3814x60vtudx93qtggsxiu1ugvvrvqfdlm1ps3vvnlnawf52sb767231qly9do07ioax44qxba11yhm8b58x9ipdcjhs33gedn947ijpktf9b7ekcluxx346vh14u9bb509f2n5oqjgdfee84zoxrxq9vv64fr2np6t7fpls5n7fqcmmulhstn0toureweqad0yqhae1ff98wzvf5jf45s650dlr6ey9vfffsy1hhdgblyka8bxte1nbbvs7fvnh2or6edjadkiybir25pi4idrz3fmu5bzkwrhncvq2g1i2dkv5tmj5rnab6xe26zceklw0lgr2kjcj52w0baguy44f5d3cm3f16iwas62yqyo56mrbkeb9g7puj5kt6n5uh0incjs8aml99tlx4vtdlthzbi0idfgyfokhs709tfrw7vimg5dc5nfj3qgxnvtn6rxhndflg1f2wgerhp1f3ln9lsrota50if1gbv7ch26yy64488tpu2mpi8y8e7gnxlcvk213y19hqkaug3fv5tt6msclw50x938k8ooy0s7inbb74ffp9cvqd42wginegwn6nvorjrlvj7aausa3isvzdj6v0rivkz8aopd819er4fj7c3s3r',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CredentialRedirect is too large, has a maximum length of 2048');
            });
    });











    test('/REST:POST o-auth/credential - Got 400 Conflict, CredentialGrantType has to be a enum option of AUTHORIZATON_CODE, CLIENT_CREDENTIALS, PASSWORD_GRANT', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/credential')
            .set('Accept', 'application/json')
            .send({
                id           : '7683f8ed-b151-46f1-883a-cd529011c4bf',
                grantType    : 'XXXX',
                username     : 'exad95mvx7vjz1z3ahns2x507pef66yhvgq5a5jatctvhrse433kw1af2hp1hj48n3vtytnbtch1c8kpvnjvjcmlbrs22lfxpypi9jbu6ycpldjwnj49vlsrn808gby0rfxksvfnrvgx9ce2y4fld7zsf67d2odxjuk2y01e81zw763q8iht55wd4q2ejqgxgemvkivbyyign9txmblq97piv9l6hubgzfr4qkhrzf8vgc1v9nnove7yromjvjr',
                password     : '0v1r546eqxqnqk53kazrd0t2hvpwdrwv2c8o9o2nb7j9blgnyxj2oxmwt4mwh14quay8vqipovm5kalsq4zof8xj9yb25s3ljmiijugvila1v06uqzj7e2gyeaenf7s9yr0teftxj9wfejdymkkn5jjbnq31pwht26b748drnic9ptixup6r8upbbqll3q578xe4uam34lqk0i6b1bg1tvznvvxkk0mxas8h5ho93wbw0tpbomxythbfevf5kyd',
                accessTokenId: '077e099f-2640-4f12-b1d8-eef80ee8cff9',
                refreshToken : 'Esse enim nam temporibus dolores error autem amet occaecati quibusdam. Temporibus corporis quia aut animi sit. Blanditiis nesciunt aut dolores quidem quo omnis exercitationem. Dicta iusto consequatur eos dolores quaerat similique vero aliquid. Voluptate placeat iusto quis laudantium voluptates dolorem voluptatem suscipit.',
                clientSecret : 'clxqp6yvixlyskad7110qq963vbwtfg5ms2rgx4m8buy51rotwekyqh3w9chajddjpepjqe3w9opat8yki9yhw8bqs',
                redirect     : '8xi38t5uykfhknrfw4lg4k4bowe1bobyh2g26ugpgx6wgxi97jijyhcjd9kw9jdsc1mn7u1w5jv0bk21ef6ki55i8zeoq7wl7y49vc0jyx9b32rzfvrh0vq242vabe3q81jgxhycbvp1hdz8ryiq5ku29azs3vh3sh3b9232k8fofxpqorfvgksbx0k6xfa4uc11iwo7ponqrb1xoch1xrdwfdstz6de6k7ycq2ghnguduvzm5k9pn4naux495qhdhzv56t6p1wc3xrnn2qxn3kwbvae6og7osvg6jcciqxe26s19408wl07gdru6cywg5b4zoc8s1lvrzbula0ps5q1c87omljm1tjpm6cnjpaoriwusvj4domvkmntsl8ehihantdl1lhzc70lkpvlyt55di7yqzn61ksk5azd6pzl6hev7qpo3bxjnr78jxmrm4hi1r6bva8limy8feiv67aiyjrplbnv1dab8dgfikqhpfme2pd3oo2g13a9sr5fle7d84qrbttgk1worikvthkv46d3s2tdg8l1zbcfna1r1sn8j6p3b3g5p72c5jd364o9d3ahiivw0x5a2xpfcvgcrdem4wl601xb07nxn2ab26lqrrtiyh63omta9qntsk4yflpjgdsnahi5r0pq1d8grx5gi3r5rrj0j1an2k2n7c80kg0l9gvmjvcufbya5r0nvjlpefir70fo1g6grj0ui5rervn216moseo71varpd16kk0hz85qqlpbz748u2ei0iycym5fwyjpwxxb0f9ojgtpryrmhgk590r9jf7pkaiuhwuo1lwgaj3pu4v8lzccnc9brd2zgm0q3f2uh2r8n429o1at545192zzsgqn0ka9zfwip4plvlme2ur3wpask3vnrswd805tst06iowrukk4awx8ilxen8oadg6g94x75pi1a7ryqiq7qlsq0eg8dm1060ly7gr9q4ds13uycvml7s2jbnlqg075yqaozss0f3j5lwnfr8ek23jk28euw6j95f4clu397bdz4mx8hjcz73r6ya9fp4l5tg8xyuqmjomdocqpu3lb53cf1ufx8eu4pl0zloz4p5uz3p5m3iirbrm70df3rcr4u5mmj2kwlfpn9chuk5pr68iboiz5jr79ka3rab34qwaeyt3nznca7yj1pkuv9xl7eurd0h7veli72oyqzos5mqtfeox0liy78nveteuppfedmf4biygcwrqmpe1arb43zhrnhzgwqc0hsv3vj9z757maexao39lxa1byfps1g9geyvwujdrt11hdhdb2gumqsc017ih4xq1j4dph26c0bffg2z994xe05x5i0e2fb0giuw5rsl1jtilw0q7cb0xrsh23bkicsyy7mnb2amxvp3jxivjofzo3jt07nhnf2dtiag8eyjceq2mb9elhb51grz4b9kydk7sxsszlnr2q3l29despxz0ms9t20r3swnjnh9sssdktxd8dc7d7wrk7snyvzqwsc4mkd762cznhks4hlkmnro1vfiyn9zy8xdz32eosj5fbidsp8icsej4e33l1l51xqqqwz40c39h9qw96yy4hidxog540rp2qr85ri6bfmy5szc5m548dmytp3b4eahbydn18e2hg57oti3jyejw60qk6mx4wpyit45dkuwq1s8nm9t4sw15e7qyksqa2k0f8p9wzi3lum1mp50phn7cr8ndwv6wxxw3w6uieykvdv1a04o00k38409af4w0ms4gm4vvh9vvfp8npp3nr21kqdn2djh8rc812nxyx3nr7lmmdagtj8uvjgzcvhof1hsb1xf4a65fh12nqix6n3gal6fh8q0q6n2zuf8nbst5jf5hyh87xl1dgp091767u6mej8s4pfkr8m31dke4o2bo61mdlxvc2svilamgtm14nmy8tva4zcutofv0dugripft7ctce7xvjppemt32lqg30y7xsgbve8jvtqzbmll46otg4vvtwga0k4c4euw7tr5r47wzp0v8ub3w57zp0',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CredentialGrantType has to be any of this options: AUTHORIZATON_CODE, CLIENT_CREDENTIALS, PASSWORD_GRANT');
            });
    });




    test('/REST:POST o-auth/credential', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/credential')
            .set('Accept', 'application/json')
            .send({
                id           : '7683f8ed-b151-46f1-883a-cd529011c4bf',
                grantType    : 'PASSWORD_GRANT',
                username     : 'd8m0axw2zf2mfosm53o1csxsyi5u2igk89yhdt7ufgzlkc2bf7ot1q9wq0s0a5rxuk7it62oaxi88rnrcthzcrgxnngal0024dk25ba0gi0nto2sjc2sumd9l2jvvcq5vcqv6okwy68sx83u2gruvw2w9gbq9l5k4dv8zwqlhw44ei3t0lgiqi4lft3nj2qslh3ca7ewmd08jx5fcp0z2ychd8du0001ysu4u61odwc92v9w0hig0002nycnpn3',
                password     : '9878meulleipkajq46a996grp605xtlqevjq3li1dmrr82lrbrr40bg6icwrgsfsvhu3081a47vcgafruyj229vlbynkwhhmuudqt6cptkwb4gqd8kcryz78mls8o1pe91wlz3u2u0n8g987q8y05st7fv2m641w4497clcs129xbz0380oyovd1ur2ydeoqbbhlc2rq67unr5vb86gfnxlmszuv8s7vd9wz8d7bqghkwqwpt50zsypl76ghhy9',
                accessTokenId: '077e099f-2640-4f12-b1d8-eef80ee8cff9',
                refreshToken : 'Laudantium est dolor quis velit. Ratione quas assumenda vero placeat aut eius amet iste optio. Rem et magnam. Quis eum voluptas occaecati illo sed suscipit vel veniam. Quia nihil fuga aut velit est perferendis voluptates et a. Dolores quos deserunt inventore explicabo sit.',
                clientSecret : 'cd26wzxsau4ap47hquchf0nvajkjld7vw0xuboh6dppbz43vj7quyylbt43se5civwbzta96w1oyl7g6f3s7osqfbo',
                redirect     : '8lrsbh2z903xfwk7vuxgabsg7lhh40veweb7eflovdt0dj34qzotziya2tyepqob8u0nddk4lysxx8dlmeobkw831c630x1sfalpbvu37m7gmostvm71b9y89g3xm19ugrd4jeeabi2b92y5r7bfpinxxcu9foahes1c8nbefe1js548h5g9mac3r74dly0sydnpagn49wlutnzpjaxnfuglyyyl2oz1npagm9t0i30rns6vd4mvsy3bjimgvu256fgwihxasy42f95xkfhk299oqslq18lgobf94ffneleoevi6i5ehxsosbbffe7lqo8cucja3c2hi452dtrl7krokapx6gj5ehcegqft7g0zb8ju0texn7xb0kup04n8hx30zf0xvh35t6ecwcf4wmgttvabjf3k6o0301be7m5yfjo3gir7zq7tiupft4lwgit3hwg29icp8ez2hg0ypjcfr2jg55v8nkula7o45r9k84j5uas2oo1qrwsjyxdnx6giqocxlk80cd9xrnhupabvx8iknryrpzjaavkrdxzzcc5xi21wl6qskqecvj55brwbzwy1odcehjggwq7mh0cvlaapd6ypi7ao5li5ydey4yk5xruw737xvble9ci4a2k985dr6cfokk8v3is9yumdrmu0lbfgeh7nhbiy3xczj58d9cfns3z6l8j5vy0eu6f125k9hondvypovk9cfwb2za6g4xarvab17m1levm5bzhfb4dfhaypl9qjvvfwuvfnb4kjtvbdz0jrw1gcyyzv5nj49sb1aqdxeh23l0rey2kyv1ctt3jwrwvc8volb7nf3c7597u5ofevy34s5q7b4og5u2f5dv1mv5j4hfqp160jts5rohv6risa8p3hiym64f5gmnlwboz2x39r3b18wkg8w7r8y4yuq4bxzxgcb1m9dum06fzc6v9mn0kiyp6h1io56cscsi3gqxu0angicogziw4c8vecv0edlhuxlyppbwdzzkwr2cp90r6jvqy290h6xfeuq2lo0iad1n3tbc8fqyorqfh25p2pay5ihaqf45iovh7ji669fej1fm1nleoxgzadzyztjvjru3a20arsqkt0j34glvgijixofu74kquey608d69zvdnk1hfc25q8g96v6xgnd582j1t9g9rfys4aaapmhsrpqojgqz6cmuvte2fojnzzp37mq9877aa83uu1cedizwe3n8mifw7z0f3nhtybrdh6zfz2pvc6a6hdztlc0tfs8y4geolwsv6jnvef0w3k030oks9wiqenysyes5cbem0pcnhcwllvr2fwi6rtb1rfm2eb8q0gow3s4hrzseninuj2xjtauhoy710p5cuhnyy5uz7z2em1fdfwnp9wkvsaypd1dde71vcjzryj9yhl4x40zy3i910kwgkopt71b1meayl3m7r7e1t13qo9pnt4v3tmrp57md6e5c0xlj67503g7qbeiamns9m0mhdsujseg7xpl3wd1fddijpvif5elrdeii4dsw6vzj88xnw5jq3n8jxedvv4geethavoo9iuy8lo6pza7456scu208cjyw42cks5vf2ve8wwikz4c5hm0jjm71e4rqenkph2ufr1gmcwhcfyaki6oj45vtigi1jjopg4fc11j9w6zdggf3llloyahv8hh4pt1kwbmqxg1ijgtrf6ufiwfhbg70sd44ti3209585tnai3iyzo1d1dbnvmseu65tiyh10x1epbemcqdsbrblw84fmj8zhulo9w5iwry174ueejpcsvn9u861m05nc61i7yy8fp6cw2vewjgozxdhcfgv0s66q6bwp3pxk4vq3b71sly9zw82vjprylitnmxt01rjahe0ib44ttvccla3ibdofatfd8bl6ll3skqef79akt3bjq8bnhir7jhdfdy2vifxt515so0c0b3ake75cdsabbfd2vtx4vm61w93u2xmt8mrxxifxdvjh2k880h51lqudfuolspnhhepdktrhb3mtb8lmbl89r2',
            })
            .expect(201);
    });

    test('/REST:GET o-auth/credentials/paginate', () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/credentials/paginate')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    offset: 0,
                    limit : 5,
                },
            })
            .expect(200)
            .expect({
                total: repository.collectionResponse.length,
                count: repository.collectionResponse.length,
                rows : repository.collectionResponse.slice(0, 5),
            });
    });

    test('/REST:GET o-auth/credential - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/credential')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '1bc55017-83ca-4c74-8f44-d2720eb26ee5',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:GET o-auth/credential', () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/credential')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '7683f8ed-b151-46f1-883a-cd529011c4bf',
                    },
                },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '7683f8ed-b151-46f1-883a-cd529011c4bf'));
    });

    test('/REST:GET o-auth/credential/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/credential/9dab746b-17d6-4761-b790-00991cc48472')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:GET o-auth/credential/{id}', () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/credential/7683f8ed-b151-46f1-883a-cd529011c4bf')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '7683f8ed-b151-46f1-883a-cd529011c4bf'));
    });

    test('/REST:GET o-auth/credentials', () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/credentials')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test('/REST:PUT o-auth/credential - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/o-auth/credential')
            .set('Accept', 'application/json')
            .send({

                id           : '42538457-2b94-4cc9-9653-e2b20031cc3c',
                grantType    : 'CLIENT_CREDENTIALS',
                username     : 'uxi32e2y8vzynd6k61ute7514qwqfbn6iucwdro66mr1752ikdhinqx4yjnqkicb4ataroddkvjj2fleueuy4ldq6s8kvbr690y11f5tp304vgb2ingh1nm3i5ilvbo9j4cod7y3rfcimwi9he8h84pnygwlfjypiyv2gllrcyer0tvu4v4brsec1tn469y9dweg7fnzhhdv3g120jmk4kikk94u7bigt61te8gtvd6lp11qegtt3qyiw5vfo7v',
                password     : 'rtsq9ocxuyd62edld75i9j6q1j1jsi9zogtwlzn4u2kmxjk4w8o7jhi1wruv3nhj0dh9dmvhhzmmmnbzuzvordf3kkwfh7tlzstrz4wohqpwskoo6t621jys8sio6fyd24cx2ptatsr6gqbyljzp690xgoubjcv11q5rozz3asjdyuhyetnqqq1ooadfe0kiguzvsp3fih7jmr9dce3tai2i3lb8s4abjq3nf75t13lqnmuagu4wmokzpz5of0c',
                accessTokenId: 'a6a77b50-c46e-4f58-80ba-cff716402c85',
                refreshToken : 'Est officiis est dignissimos ea rerum. Atque et et numquam. Aut ad aperiam aut quia corrupti sit sit quae qui.',
                clientSecret : '9hk3wcc93gisx0gtogj6npegnex8mvtuix4jsxktkbt0txl4ei0tgh0an4ijjh2w0nol5mf6msgdju8zz0vymyklwc',
                redirect     : 'ynh0ifjegn1qye6oaoxydnph2v1t931vzrfzxh2y1ueyf8d7a45f1if7upocccfnacp8wzri9324gtk6uvn5ik6zskejsoahn8akrh8185ovizds13nprjpwnknaanmzyaltu2vv1245pyx8j192fsyvzxhmqzzmx9mrk0q2xyig8zoyoi0z42ti9cx2ei1wtm0m1vopd8n2mm7cug8v3mpvqzenb65q8ilfiuf57y86pd5kmbw0yigou0dpfzol7p9b6obv0u37eyj3gmjq4smp0438ld358pispkerryadpo24xeqfxg7x5dl1py9e2zggpzhkv2ureatfih73tz8njdwbrmsqd5jmbnbw5t6pvl37vephjpddtn0zlbrdg2tn1a9yslt97azy59z81opwo72l7lrbx873spw3ws4564ury502qjofcfg62i3m8wqm2ekxd85rv8fq6v27gxehengs9ea580ankhc0u9banmpc4lpdfl6eqbjl19dsru0zcjw6y5izg1d9dtrm1e5s8uwm8po4uqnoav1ppvdftm76fy0977uz5f9l3m2y0nz8a1inql5mwuazfedd5ks4094efzc41qgm6gtslgi8allrh6dwa74i5kkqfamfqg7vmka1xnrd15qx66dfi6obx42v2cp1rvfy0n9pzn1jsxho75ie9zfu8f1dk56hyvqtbd5nskyky1qvu5c7g7f0acqoemz99zjvyvllhbmcwbhijnab84gcnv8urbs6rqfbdjnemtpw96w8o6bhm0eboshc9a3x52u9xuzgh4geiejhw0luw18wceol2ajr4sgx1ekwyxe0mfqbuagyd14yzv8fi1l7yjh2zwmmrkqah8u1sns9bjimaa7j78h3z60is4bj7wwxtwpaagi999whmauahjx215vhgrtb7jgz504og48siavyo98lgdoq2k8eie2dmii0w5ot8w9t1cqmfd1xtb4460undoua9tade1uo4gs33rldrz4xeqmdsk1h4aqj9ywa2572b0p14aen9x9mjlgwrnppewqvxprc3baocg1mlgqxi845e9g5lumlm33uo4kc9pjrqlucpvxu84zx32gvtoray42kd0d7312fsi8izgfbzrw9zzrqlifbosj0yey184qyrdphrzr6m3b5hgqdy6x136o4han3k4u1dor7lwxun0p2dovue169f6eujvciyk2mnwcbcupc7xb5fxpmejlxzbyo1ut5nd0okae6d3zmqqgeez97nq1eodrw575brqoye264zwx67fky5wm3qwwi6fjft609ed6slkq2nrys4vbcycmurnk3gl11jbta0k1vmm87ql9ktwraph1jx0ipew3qxvk4i1euh5qbzg99v6qdzfdqqif2584alynunfk2bz9m17yvtksiftjm8y6znl94wwl9km5z4z3zh68lzcop3bbmtacmdl2630t99a7wmb30k5gzoldrfba75nold5542qrn7s1beuw3czrqmzhyysat30kwv3gykat25rfzdrubrm5kzs07xrzcv1jgbybmnek167h1bgy2gqpkw3xe3ke4flut6po73jhoxekuhc74gdu8xd29nqwms65oyfll85i0auw6j7lvjux7k48vduk3phy3p2jxe2mlp8akulgca6kakwgu3rrwxyifvntr01s7zsfu39705xcg6adgijshxbwjovwvfzgkoyn9novxalybbfozalvluij036clkjv3jatquup7yudwfrzandj2xwtm1lprbz32mo7oyhwuecfrcf45vzar06lu21zu0t0ufvlczag2787vx4ziyhqwczud3iry0ztuqkxfhymsse4sdq4o0ar507gv19e7xeh54brg5pb08vui4aft4pz19tpl74rp9boztu6h9nox6okqd14n1607y0bgn9mibffkvlcit2nsmvid1i87p397sp8ko6ubsafnidexlbx7aor4ck6dago6t0i3sr2upbto8l425gnzlcqv03276wpo',
            })
            .expect(404);
    });

    test('/REST:PUT o-auth/credential', () =>
    {
        return request(app.getHttpServer())
            .put('/o-auth/credential')
            .set('Accept', 'application/json')
            .send({

                id           : '7683f8ed-b151-46f1-883a-cd529011c4bf',
                grantType    : 'AUTHORIZATON_CODE',
                username     : '7l35fte1oc8hftuv0na15gab1ir8teangm2zya8uy18yv2sp6dkce3teo1a9mzufcivi36l9za27y5sxf4k6dkd31vu5u9pv4br2fsr8kdsohxrjtsqvn5vol1r46m3txrr1v3ell9ze9y5ug1or60pxueho1lufyn5jhbm7ktgh4x7yrdf3jdhfp206uf6ezt3ksgzacym0amthct1ezetu1kijk0pk7fmvb72voef859v4awzpma348mqxpr5',
                password     : '60g7ur7gns0arjr82g3sy704bl1vm8t1ebkmh0s1p9spxfme7pjerd5bf6x6ycy23351d2adcduikg10sb4035ot0qkg1dan4fg8lmf5jlzvlw7qilabj2jucarbafq7pkx8ul39iwqc9qqmrehx216f6318zcy9bgxgt053igceal9j8ic5tt6bqq1z21ds6wqmniu6ibmdndesmj709n0bbb8ykrs9p9eyph834b26zccnolnr0cnivyjkah5',
                accessTokenId: '077e099f-2640-4f12-b1d8-eef80ee8cff9',
                refreshToken : 'Voluptas numquam eius iure harum qui cumque rerum. Aut minus voluptates dolores autem nobis. Iure autem nisi autem quia. Nulla recusandae ab ipsum quia placeat. Mollitia iste dicta laudantium labore. Nostrum ut possimus.',
                clientSecret : 'qbixpqw1fqhqhqvbq0tit1hdw9p8aolm83emp8or2kjt5gcs6qcjc340cy7s7rtlmwlv1tau966or2j5zp61e8aypu',
                redirect     : 'fo3w5p874zmqvkjjtetunwdnewpfi8uohsn4pqdp0w1oeojclmdk471y2esggiybkslnch37met5xq3bxa0pym5o6ms6s9gapexymoys0pfs8qxu00xj6ugs1tlytwtkzqnp365fcajigcnvaqan96keukfuxszdu0fn92l5wfwtua41852yxi3muvt4x810uiade3cd4z28fwgbri2zvz2qny457izpqyv85iidx904ealkan1zhs8pecpxd3hqbnlgr0xo95l790wbzddonry7gepqf78mwvbnsn52n4u1trhrh8zfpskkv3ph7tcfpxl7rdh2ms8bydbt3c28pu15r2jr2pe326gsdkvv378gh7qsylm5b8buwfqhcnu4oi353ywxt0udtknayolxd99brsdcwm5islmizm37ay2wc5381u5qbvktemz3u35jze8e133a87vjd3wky5vz885h9zyki1mf71xu41zup6y4favgawbh52050lzfgwdo2ftl32o16l7mzvc28ly3m0hwf0s0l4uwmfa6cijygfo9rjpfc33gughy2bysz210yeyejss2cv7qu87hzt5cnuo435x5h3mdwvk2scinx01mk9fkuas06rlnqqrt13whm27o24azaxkan3t2hkx8qjfntepwswogw1wic8egi1dqwzebf51wgp5petbmbyk340x2r9rr4svk29ggzo1dk1pquud6z21ur4mmtxque2uffocy8m7a02isfi1qk9wglz4womlun2lrb0oirc8hdz1td3y30684gp35pxavdeqdarrzbkcj1fiddf3fdhuv8mj60n7wjbt20wged6f9knoadyhxae4t5hzglq4x065c5nbd4zh1faz4uh0troxbov29dsn3xmwdw92maz9o3tsbbk7913y99wuqd39niwhixb2c94pmqou9zo5tg3cm3fs28ofrz00v79w9n87k1e1tkdzhlc2je5rrwhjwa9wfvy89d2j0cu2a3hygm5z1981u0jw1aqzu1sylt6euqsjiv73ngw2bk0t03xkrwa83fqkfikr25jpm7258rf3yfresb4pnhd5siro9sr873sp75se5ak29fna97nlwbxn545tn83mu0d3xudmaooo27gck3vksa9muf7ow78f6wfhy7ogsj1p3q6zddvj7ro572eqo1g9i33i34xc93q81ujsfz9yfif6snmrg792d17gjl7auwaw8zsx3o50uqvytq2po1uewfngoshpe5cibgnxec9po7cmzffz22l1vdvtibl6dz66rwrvhkee5xqb6a9eqzo2o3owl5ryruriow76l5kbcouu3ujmdjdoh0l3in1gyog7eofxpf177pijm6i0v0ebc8z9j5zaaz0a3mzbyck45falvrcd2ei831dm58q5dood2xos2zpn2j3whddph5kfjbqjejcnxuxn5xewtgw2h09j84anvdp246mjnco7dae5w0ykm9zez7nc0puczq4jci0cazu05avus000p6tv2ypujim27ag9u96x03x1xhzvi1qbyaqwgdqr875vi2r0eude9dmzzcdco0utevdbhipog7xvo2ihvayzys584zkrvq8p4w7ooj0slde3c1e8b8em5y36bynh4rc97tb38q82dloncfgac6z39pvurlojcc0sv1trrz1p72e9fb5nt7pb1m4ifsv4c9ijdtow9p9e7c4639hq83188zh485jzesa6gdkmnu5cji07rere01tsaq2v8rm4okzlzyssfr4oswtj6of0u6z1lxtsor84lytuz93z3qpx6yvkxidyrrqyorzm3mao5qn2clinnzovws2b2bvfzyxctz4w5sj6ypm1jui4psr9wnzhadnt0g7vhoval3uq7mk41dizp0nhnrojoq25fowk2dzb3cn805kx3k8y5jzjxqtr7enh1lw2wkjuyzjupd6r1b5tec3ycw6fhcarzcig92j0e31urxy4p81p3oxygehxdftb1o4ksc0uy0uvr',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '7683f8ed-b151-46f1-883a-cd529011c4bf'));
    });

    test('/REST:DELETE o-auth/credential/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/credential/214af5b3-b6a4-45ae-82b4-1d12b5850a63')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE o-auth/credential/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/credential/7683f8ed-b151-46f1-883a-cd529011c4bf')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL oAuthCreateCredential - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:OAuthCreateCredentialInput!)
                    {
                        oAuthCreateCredential (payload:$payload)
                        {   
                            id
                            grantType
                            username
                            password
                            accessTokenId
                            refreshToken
                            clientSecret
                            redirect
                        }
                    }
                `,
                variables:
                {
                    payload: _.omit(repository.collectionResponse[0], ['createdAt','updatedAt','deletedAt']),
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('already exist in database');
            });
    });

    test('/GraphQL oAuthCreateCredential', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:OAuthCreateCredentialInput!)
                    {
                        oAuthCreateCredential (payload:$payload)
                        {   
                            id
                            grantType
                            username
                            password
                            accessTokenId
                            refreshToken
                            clientSecret
                            redirect
                        }
                    }
                `,
                variables: {
                    payload: {
                        id           : 'cc669f29-cbf6-4af0-a63f-1f991d2c13c6',
                        grantType    : 'AUTHORIZATON_CODE',
                        username     : '9p7jumpom3in4dfbsophmozhkp4a9h20u15opzpah5l124x5swlz3gb3ymj0ixrajagc3tr25gfump6qi9yzycghnwmm8t2bwj1ewrt0jsmppoq8ao15dtu343x6xvtdsdr45uukbbkbx6w7h5jofa7ccb8l14i2ls9urfja7xeli7cpvg79o82oj2aqynz6ga6wrrkf5qyl533qdjicr4ey3c7l25fv3m90fbe0h2es49lh4xgyqtxwdvc13tc',
                        password     : '5czst36bfcxyz2m8v99b31izhbz1gn3f5kwuh92o2z9sqinq688fjq0sundgz2vkqagjnevt96r87mznjho68t8f6333yspdftask4uo38sxsu5njbtyvstfngqltbzwx009a9pc5ixcs6o52k44tu7x638w9itp0lc3wi02bx035mavlrtnozm3rpcimv4vikgjuv5cqyjrtby74iffscpewgiaxn2tkd8xl6gp84eib8xz4r7gizrxrpv4e5r',
                        accessTokenId: '077e099f-2640-4f12-b1d8-eef80ee8cff9',
                        refreshToken : 'Consectetur voluptatem non fuga ullam et. Sed rerum debitis odio dicta ab aut sed facilis eius. Molestias ducimus et fugit asperiores iusto voluptas qui.',
                        clientSecret : 'f1tkzgw3uuab923f1n44uc4se6ylx82u8orb62cdrhkfsy1h4jo59nzwnhrutz5uopn9z3rpbl7ebshbjk24l7r04v',
                        redirect     : 'sq2dqf0p9zwisvc99xh4jvf3cd2wcyrd2eew4csiizavxkqclv5oq4wju0mre0d0znxb9r8utzncm5qo4p3rljhcf01ex0e3v8xdxm03kqqa2s2nlk3riefo2eebki8hf2ol7q3dgsfo7pmi1vngxcfae1r5u8e2wmm1xes16f9rrm3o060toc2tc910fojzoiqlcxp1mwgn5f123e08oiiycb5qrw3w5rgftnghyfp0g87snem9mna8fgc3nd3m12u0xv122f2bf3u3uv5o89m1g2d5ty7p9fei72u8qf4xxuds86wnhk4lgjskhr8nnbprmkqiu96zxelbbe1jrp0ga6yfperbcm8no1ho2zn6mbgi2bd8fdcsr9rk85vg5eduvpdv0jh4h86xsabduouj6s7fefq6l977vgm4ib1pkktcx864vafjsy0u4ua8mjsndthuxucbav5sansosu7hf5fn555b35sqdm37kwuj5udz38ssu5hsnur8fwg1pri7gv9vh06rgz0tz6lnehh56nl9emf730ko8i2ok1nzo2v5dmxn2fmpsopn4m22dlzdtp0pzbruu09tbp8n8v2udzzg3kzx4rmfnv0e4upo0xarizlcurjaafrqto8majt8mwjgt0sbsdmd3z1tjm18xmsrx77tpun4ek9ift8a8qxgk5hkyxccriq77su1idkgtayibe6jrjvpmbq191pxzk69wheq9ppj3k1q2d23vu3f3ayu4r87nfjnyth0jm04kufrmm7wt8w1shzu8q7uvendobshr641jomat3yhq965zoqxi194bn27h6epntyqj3mslfz3p35nzinlxh6q7i07m0l3wra1rz7d7btd5j52x1zcxvsda9239flfpv0fvooo6zclt3ciuyb21lz7i9idnlsutjez3018q1rnwm8z67vk0mdkk0491gkc2bww2ni6qha0881dmk81sr434o5l9hyi4dcg9ob6sc5ckulwemfxrzegj4cfd66fd0mh08wghztvc9pmtwbx9i0qnvv05ql4ocpvdqx5gblpo57jrgnkbqx9rxa7zggiesik760hvwy2ifhp8ks5yowv0iziuywqzz4bkayhw3qsj21eqnsspohv4x7ic33sdbtzg0a3slcgs6ueb0mjv98y7zldvpszdbddsuwjvmf1l98m8xstx72uff0ygxyb8p82o5rr0izm99wuy6rozbigxyk4mad0661z4mqg8w6yup73ghfj3izl5jt3l1h8gkc0j18w97vyu7tgz3yazlc71n52fpd9pp05r8kbsih00py6qeonwjc1klzz1rykjjzgbceee8unbza7pkij7f473cqs9a5jidj6nomsywnv46gtmv4kvz2s8koc3sf5v2judfkvmnu6kybj2opu1qs2ow1eoxsnxevmtnz2epy7c6oqxxlrax2ndozg00fwny3zgdf3pv3lepoph9w25cctn7emn7i68kyoh0oqpgn2chimvzr3nkbx64053i50gsn9bec7wqd4hx2lnh2co6whzcqfotzcroedcba5g6dylgzk87kus6ww8t3d4uj1xmeeqp9ajl6h34tpnj89rd5emgrbetmbas9n1sqvcaat56ge437l16tx7nrw9mb7azvht1gb55firixg4fvoxwug0fchfd8l1egesc4g5rxkquhqqnlacq85fb2mo5zad93fn8sr05qex3s3ddji944tvs3ts2pbokyh6v9q5ku7cnn885mu8h5ek4xzze4l4o49a8mquszfrz8fj6l60pca76pcm5877dsezqr6vshhfnd2h3wqauqwlx7o52vjtv5rl8tvyqjh7mqni9qgjnzedn8rd0ovgiyzqmz2e4cbuf4ks3cozhcfgeqhydoozy0n0i1gkglczakh8ucuk4dmhcj4suc8da708tmteyqm9p61u8gjlhvt8xiipstow23c10qp8vonznzgs4qqfgazk7yawsjayz4kxbyoe374xclpnplba1nuzucfc3u5',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.oAuthCreateCredential).toHaveProperty('id', 'cc669f29-cbf6-4af0-a63f-1f991d2c13c6');
            });
    });

    test('/GraphQL oAuthPaginateCredentials', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        oAuthPaginateCredentials (query:$query constraint:$constraint)
                        {   
                            total
                            count
                            rows
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        offset: 0,
                        limit : 5,
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.oAuthPaginateCredentials.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateCredentials.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateCredentials.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test('/GraphQL oAuthFindCredential - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindCredential (query:$query)
                        {   
                            id
                            grantType
                            username
                            password
                            accessTokenId
                            refreshToken
                            clientSecret
                            redirect
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        where:
                        {
                            id: '9cb3f4fd-9b2e-43b9-b2c8-db5d458987d3',
                        },
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test('/GraphQL oAuthFindCredential', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindCredential (query:$query)
                        {   
                            id
                            grantType
                            username
                            password
                            accessTokenId
                            refreshToken
                            clientSecret
                            redirect
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        where:
                        {
                            id: '7683f8ed-b151-46f1-883a-cd529011c4bf',
                        },
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.oAuthFindCredential.id).toStrictEqual('7683f8ed-b151-46f1-883a-cd529011c4bf');
            });
    });

    test('/GraphQL oAuthFindCredentialById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindCredentialById (id:$id)
                        {   
                            id
                            grantType
                            username
                            password
                            accessTokenId
                            refreshToken
                            clientSecret
                            redirect
                        }
                    }
                `,
                variables: {
                    id: '4101405f-9ad0-4c30-a678-dfa5cb2e5c54',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test('/GraphQL oAuthFindCredentialById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindCredentialById (id:$id)
                        {   
                            id
                            grantType
                            username
                            password
                            accessTokenId
                            refreshToken
                            clientSecret
                            redirect
                        }
                    }
                `,
                variables: {
                    id: '7683f8ed-b151-46f1-883a-cd529011c4bf',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.oAuthFindCredentialById.id).toStrictEqual('7683f8ed-b151-46f1-883a-cd529011c4bf');
            });
    });

    test('/GraphQL oAuthGetCredentials', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthGetCredentials (query:$query)
                        {   
                            id
                            grantType
                            username
                            password
                            accessTokenId
                            refreshToken
                            clientSecret
                            redirect
                        }
                    }
                `,
                variables: {},
            })
            .expect(200)
            .then(res =>
            {
                for (const [index, value] of res.body.data.oAuthGetCredentials.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test('/GraphQL oAuthUpdateCredential - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:OAuthUpdateCredentialInput!)
                    {
                        oAuthUpdateCredential (payload:$payload)
                        {   
                            id
                            grantType
                            username
                            password
                            accessTokenId
                            refreshToken
                            clientSecret
                            redirect
                        }
                    }
                `,
                variables: {
                    payload: {

                        id           : '06cacbd7-ba62-4a52-9c5e-a13a55e00a9b',
                        grantType    : 'PASSWORD_GRANT',
                        username     : 'ejrn0bnxvd3v0jhfajo48sm6w29lpmlf6orhyvbpe53jxow6wkstrlwkein7t13zsmbbdcsq5dixmg9ofok0wvhgxf4w4rilpy9wwkyu8rc6w5jqk39gtjakyhtc0fs6z82nfkbazmu64r3g8iqccrfwi9z08j3g539hbl7w9hec2pwuikg7kie9gzzpa4q9ze4hatykednk08km2vu5cuzfs00nqtlptj5tnj9vxv0snvxsrk9kky3clovcmpi',
                        password     : 'clnbva9q0bqn164ai2nbv4n87fwhgjdm035dnc7qu7pmclptygowf39dc2uoc5tl5hdytv6dkajo206v7tinw5a3wctjj50txs81rlonh54gaawlpdm2vhe79x8ez8zj3lkmkd9edoescqnm2bhkpkjjzcnri5rousomh98ljc3g18y9tqniay8l67zarez75xakimet4rttup89sxhzbpsjtglzumuseexqvbxdv29usn09vaiwd1i35hxhb0u',
                        accessTokenId: '169b0d08-7644-438a-aad5-20c50da5f5ea',
                        refreshToken : 'Neque quo totam. Vitae maiores maxime possimus similique consequatur consequatur doloribus. Qui culpa doloribus hic provident ab. Quia quod veritatis quia.',
                        clientSecret : 'i5sods0yvjjvg7l37o17v2l4d6oeclm5k2pmpybsqza34rqwmfjaxip7do6oj1ddndyv636tr84xdwbq45wl12p3wi',
                        redirect     : 'miizys73t8b0qzz5rdopekl15tdgt9jsfpv6xsbcfoou3no0assjcjei3h5pxfiv9zn20oafdrvr4a75y8ll9vqjyl9h0uude1z2iroiwsf79qu4i3xepydoy3vu4352ygknmwr4gn1in1j3hmog61lx1v5frui4wlwa330sfkht15reg09vpcvgq5zrvkysjg0y79nb0c0eczszkak1dv5u11s6rmygsilrm69n84w2dxp3xf45077trm6mbp6kjma18nf9nfzggohzzb4898r2602f70ktxepwprp89i9anbh4qmhfg66v3nesi4zfkqy7937n7pp35vemmvhczffuhon1xfje545bwhannq5fcxyvmumdy722lm7cunk43a2x1opo5y9lgfi5q9yxlvleazr20wvyjbb0oyv0xckf2uis8l2lvvfp88n1t2dk149v79dno1jc84jpn661m43ibbkhnsc15ied0tfip1ga7gz6byj9ll8gagjhg9g0aq4du8umtioziqiznq5wah3xy7bc59sgedilxf0jd9048chip0knflokufslahjmumdt8sg0nqntkdf5x4vs7sbkpm0c5hdubqajtpy89g1mvbr64ny6ogljzycli1wcgcyy8m7z4ikmd287mrzojh5k3mztsv25nnrjsg0fa1d73r36sl4x2t0996x7ol4w1bl0rb5urlesj7coce028yb3f9nzk4wami4u7htnynxqw0k7pzavtzfqlhd38eit0d8xy65wu79tln9yxcwcvc257k2so0629ovabrjau2wr0tvyppsl0e2f3j8qmux3zbu9muhz98v1c7opeyakitvxh6p0xafyq4yc4ciyvs433on0vjrojheykty93pcu26rw44wrm5j19cwehrruxgukd4q9whyvmkg0r7k36lcb4h4yzxvr6fk6jasogi1elcd7z1wtm3b20srtprvl34c1gbfuujykyo5z5yo5265jygop98qez86z2zfyfh2dwa8ddiynvsf4fheqdbbcdvbq8tpdezy55e20gblzns9gop9xa02i9w17d3am9kcajdiexx1ggzk6qjx4wbty579ijf316cfz5m2sb4orq3klwamtxgbaguxqk4bvrrezxla4n5qpky6g52yf8x90kufd33p8fnao2xkqgt4t475lepmdu6f8qkwtv39p16iibrl4hhg8ulmjyvg68i3dn7x5hqpet0pfn0illm758o5112gbjpmwpvo0ivv3wuxroxs9b1xr3l1j9e5upfxozt06s6bfqfkqtjkivq2v5ldki2kr1ahj0x9algjhx07xnjfe04ri9jnmoqzzcnao0qgmj6sk0c96c74hw95r7apm3w9cqa12bs6bm7gsddifx0qfnec57p8ae9kjkpxqy3193axi98qatw99jv6ghucrybw06ese65eu7z4xcz2te0fdbjt5kl1s258j0wz9rw2jz8cps8iptpqzczl5reo5pdx6jlqpgh7d38pmg8rnzk2gug4xtad6xax67cs8tnzhirwoojer45dcxatcmp6y1qpanf8zmkofx4maxz4pmzjcswz58bxasntl9hupu3gtjt5k2zlrzssio44a2x2j15v70jcu2gw1qir56ltv6m6adf7b2cwymfg73bm9iurxrl8ic7klj4xwcvhd9ky2e1aay7ecs01xlyj79uurpy9jdzk3qtmcld0rnghb10mpboixqt8p3nir8th92i2dbyl7gqomzy51b9nvx2a132dmka4t4f2bz4190vbbxfbz1w33heuxigo0758hmxxw9ylicj1pcwxvjghj7doi8cad0w0xoihl17rhlrupqkytz8s5n3unyai3bzjtei8cxel7q85cngwipvbzc2nfxulzdhrnw3m39bqv3kuj9w65qyv8aaxzwi5hiw97t3efndb1fyssl5j478chwukbwluyc9slvsxb4h49yl02426jpcuh57styi19otf0djjpbxlvzthhr6os9fj1m228',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test('/GraphQL oAuthUpdateCredential', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:OAuthUpdateCredentialInput!)
                    {
                        oAuthUpdateCredential (payload:$payload)
                        {   
                            id
                            grantType
                            username
                            password
                            accessTokenId
                            refreshToken
                            clientSecret
                            redirect
                        }
                    }
                `,
                variables: {
                    payload: {

                        id           : '7683f8ed-b151-46f1-883a-cd529011c4bf',
                        grantType    : 'AUTHORIZATON_CODE',
                        username     : 'ciuxi2apf4rb5tkq5penix9bfqny6k2lf3kgmis37xpyohlau3q6vo3mk1mottfqv1zr404aiivuwm0cnvta264fjr771lqsr5c9u12sj2q6z79kt91f9637nads2cp6a74kf1u570gevbpssvhfn6iqekii7tkb8i74vt8xpn3qhde1fui61413r8z5q9c9brg4vq4ixbzc4nyzpee50quw6bq4z4errio8hyx78e4wtei7tztzpg9yghnoi8r',
                        password     : 'hf7m4dk8nlq2dwhtcod5nr8isb2t6ffe97hn974kvnhjgc1clw59bic3km97difzafi0pz422eins6w5aqvasdqne857xe5ogjnb8rhbnatja1xcsem4titdvj1zd8ielqtqeh0cbgeiv28ejmyxyutkvs5kb1aqyi03rjlfv97p5ivpj0dl5mtw2u6vjzjo84qh704ctxkmdm2wxrnz9boszls54bzu8h80it3klmtou7c894olryzs7em1tpb',
                        accessTokenId: '077e099f-2640-4f12-b1d8-eef80ee8cff9',
                        refreshToken : 'Explicabo beatae ipsa dolor molestiae. Porro sed consequatur atque modi voluptas dignissimos. Omnis sed totam rerum molestiae sit. Debitis sed quia blanditiis aspernatur error fuga tenetur ut facere.',
                        clientSecret : 'pewwfjnkmfs8jf9owms0vhjp3tliglk5wg9imdkc4911wyz2lbgzkz7491d8ya49szuyj6jh1qxwargg6u1yt8ssei',
                        redirect     : 'a9jbugcbkx0mxpgxdjyan1hc96nj6h4ecm015i89nhcaeofav1u4cructno7rs7u9fb6embok95j3m5pdi87k16p6x56s7zmp2l8m7f2nla06pe3n3mg3vxsjw00ig6adk58zgoe6uw0oorsqzjmoq3i57e4i3suom5luv7p8ujrhn1ucv1asobkw470z3ag9hzivd1s2og8klt4hg0ofwlazmqxnfgmqi6c2d3skwd19xyn1ouqw8azcf9kicp635i4b17tv2gx6t3o5dwksrkhdj01i8dznfzr520n2j3zf7cka8egngfsv2juwavimxoeq3q8wq67rkjhqekgtexfwxc40r42745ssm3xgw7rd9wt3uwe293w3gw43j9nbcp8pm8m4pgrze8e2j0rqztoukrwbrlc3d9pze2zyuwi5n9rm3hjlnyg47dy3neggbmdi5rl0m4tu58vy6renwtv1xgm1wuub0u4xkc6u4ts68qzr1klakza4fmq9j99bifr8l45l3hjbgd2xo5up7k7cq0c60akh9s487i0gib9vzzv7myr978c9lloxyaixqg1lapocdrxbujvlhsb34eymkfgjmktw7fhl9o1bnnpjig8s2n0d2lauu9n55qxjwjwdq12jooa6rz8dyxo9jbptc0gwhlntjv3pz6le5mor0ecafi8p8j0oxqukdhvd8krv9zc3mju8o0plkuyu2s6l9ty7vc6sawll7yi98998d05umwguy29umichb2mk83ajv9vtl2efxfpc6ki52ocgsxo9j7bsfa0lt9aa0qxqw3jb2ebqz3ju8qd9wu6wvjfp9n17eeech4lc29eqhblnqomx57x5gw11w3ta5up43y9tftv23y317offln47l45cljl6orvn2iu8ijcos4nrrzohrtkbc3ura5vpuham09to9vjm3xxeobtlxb29evyxifajtu8x2vvpr3bjll4suf7t64i0wg5borguunir1pqgajkwiksk1ckh9cw7pecflqxyf4l83x2rnor0amgteg0oiw2t95blfqw5bj0otvo2401azs7e0lbw049s2646jidul1ru9daode4x3ne1956zpj3pbkipwvsmrgfcl4yna6dxigl6ru6sdip7i10isqedq9fzjirmalgp5ihoxrlv5kfry7dk8cpf9g5ojv0ij5nvcq4daunaf6bkkfpuduc49phf4x60aj8s4gogysfz6f06qjpivs43yfup3ik0n5l39u7s6tv3k0ekvikin71lfccn8lx0wdwgpddisszbxmrksrzn02s898r29dsok4916ea5h142l7lup86xiixcsz1cjrwblohx9frtrouav81p4rw156tey1yfkig1wn9lrvsumiwoie7tde77ptol0io1v25b3i3sws7r8uncj6pvmx9lp22mwh6o9y0g6w670epielmjwoim9xk46hgk7rg86p36koi0p53034b3rwfgmigvghg6abcrbr4mvekd660nfrd6pymvr1h8bue39vwshct8s4l88uksbgbvngx3y8qwnkpvk1sp17j8uz71hlfi6se10qkzlws3kl4aeuk16w1317hk5ejbcvcv0ddxv37380gcd1znda563oxnvpkbht0qv9mgynz115wmyf4diukagz53feqekdz6vjqzlc7e3526kc421o7xozhmwuvfupo6ejiz6bonhfbe6itxgn1chit96w9x4aojov6fp6eoorth1uxwdzhtukj75tcpzrvkznej2ym9dal9hpsoi8ds63nq3cnwbo5z0xrsu68xgtn8efjg3vl7uyexboqrn0vr360hblzd5y303rggmacy223zbyhvcq1sxzdilnk1mztm7ij1va07l537h759gxtvxv5kfd2jwstpiilet9mh8wtukzxgvmcja41b1klr3e4trpjgsukblrnuvmfiesoo0tne2i0enaxif2zz0a1jer573tb6o5xxhbnfmwem047i89v2g4z93kysfem8tomscxc',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.oAuthUpdateCredential.id).toStrictEqual('7683f8ed-b151-46f1-883a-cd529011c4bf');
            });
    });

    test('/GraphQL oAuthDeleteCredentialById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteCredentialById (id:$id)
                        {   
                            id
                            grantType
                            username
                            password
                            accessTokenId
                            refreshToken
                            clientSecret
                            redirect
                        }
                    }
                `,
                variables: {
                    id: 'd783bd07-8994-4120-b536-0bf60ba42af1',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test('/GraphQL oAuthDeleteCredentialById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteCredentialById (id:$id)
                        {   
                            id
                            grantType
                            username
                            password
                            accessTokenId
                            refreshToken
                            clientSecret
                            redirect
                        }
                    }
                `,
                variables: {
                    id: '7683f8ed-b151-46f1-883a-cd529011c4bf',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.oAuthDeleteCredentialById.id).toStrictEqual('7683f8ed-b151-46f1-883a-cd529011c4bf');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});