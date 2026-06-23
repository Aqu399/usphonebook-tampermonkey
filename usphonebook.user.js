// ==UserScript==
// @name         USPhoneBook 全自动批量搜索
// @namespace    uspb
// @version      15.3
// @updateURL    https://raw.githubusercontent.com/Aqu399/usphonebook-tampermonkey/main/usphonebook.user.js
// @downloadURL  https://raw.githubusercontent.com/Aqu399/usphonebook-tampermonkey/main/usphonebook.user.js
// @description  直接跳转姓名URL, 不填表单, 全自动 · 内置性别过滤
// @match        https://www.usphonebook.com/*
// @grant        none
// ==/UserScript==

(function(){
'use strict';console.log('[USPB13]');

const SK='uspb13';

// ─── 常用英文名→性别映射 (G:gender) ───
const G={aaron:"M",abbey:"F",abbie:"F",abby:"F",abdul:"M",abe:"M",abel:"M",abigail:"F",abraham:"M",ada:"F",adaline:"F",adam:"M",addison:"F",adela:"F",adelaide:"F",adele:"F",adeline:"F",adolfo:"M",adrian:"M",adriana:"F",adrienne:"F",agnes:"F",agustin:"M",aida:"F",aileen:"F",ailish:"F",aimee:"F",alaina:"F",alana:"F",alan:"M",alanna:"F",alaric:"M",alayna:"F",albert:"M",alberta:"F",alberto:"M",alden:"M",alec:"M",alejandra:"F",alejandro:"M",alena:"F",alessa:"F",alessandra:"F",alessandro:"M",alex:"M",alexa:"F",alexander:"M",alexandra:"F",alexandria:"F",alexis:"F",alfonso:"M",alfred:"M",alfreda:"F",ali:"M",alice:"F",alicia:"F",alison:"F",alissa:"F",alivia:"F",aliyah:"F",allan:"M",allen:"M",allie:"F",allison:"F",allyson:"F",alma:"F",alonzo:"M",alonso:"M",alondra:"F",alphonse:"M",alphonso:"M",alta:"F",althea:"F",alton:"M",alva:"M",alvin:"M",alycia:"F",alyona:"F",amanda:"F",amani:"F",amara:"F",amari:"F",amaya:"F",amber:"F",ambrose:"M",amelia:"F",amina:"F",amir:"M",amira:"F",amos:"M",amy:"F",ana:"F",anastasia:"F",anderson:"M",andre:"M",andrea:"F",andres:"M",andrew:"M",andy:"M",angel:"M",angela:"F",angeles:"F",angelia:"F",angelica:"F",angelina:"F",angeline:"F",angelique:"F",angie:"F",angus:"M",anika:"F",anissa:"F",anita:"F",ann:"F",anna:"F",annabel:"F",annabelle:"F",annalise:"F",anne:"F",annette:"F",annie:"F",annmarie:"F",anthony:"M",antoinette:"F",anton:"M",antonia:"F",antonio:"M",antwan:"M",anya:"F",april:"F",ara:"M",araceli:"F",archie:"M",aria:"F",arian:"M",ariana:"F",arianna:"F",arianne:"F",ariel:"F",arielle:"F",aris:"M",arlen:"M",arlene:"F",arlie:"M",arlo:"M",armand:"M",armando:"M",armani:"M",armin:"M",arnold:"M",aron:"M",arrin:"F",art:"M",artemis:"F",arthur:"M",arturo:"M",asha:"F",ashlee:"F",ashleigh:"F",ashley:"F",ashlyn:"F",ashton:"M",asia:"F",aspyn:"F",aster:"F",astrid:"F",athena:"F",aubrey:"F",audra:"F",audrey:"F",august:"M",augusta:"F",augustine:"M",aurelia:"F",austin:"M",autumn:"F",ava:"F",avery:"F",avis:"F",axel:"M",ayana:"F",ayanna:"F",ayden:"M",ayla:"F",ayman:"M",azalea:"F",azariah:"F",barbara:"F",barbie:"F",barney:"M",barrett:"M",barry:"M",bart:"M",bartley:"M",basil:"M",beatrice:"F",beatriz:"F",beau:"M",becka:"F",becky:"F",belen:"F",belinda:"F",bell:"F",bella:"F",belle:"F",ben:"M",benedict:"M",benita:"F",benjamin:"M",bennett:"M",bennie:"M",benny:"M",benson:"M",bernadette:"F",bernard:"M",bernardo:"M",bernice:"F",bernie:"M",bertha:"F",bertram:"M",bess:"F",bessie:"F",beth:"F",bethany:"F",betsy:"F",bette:"F",bettie:"F",betty:"F",beulah:"F",beverley:"F",beverly:"F",bianca:"F",bill:"M",billie:"F",billy:"M",bina:"F",bjorn:"M",blaine:"M",blair:"F",blake:"M",blanca:"F",blanch:"F",blanche:"F",blythe:"F",bo:"M",bob:"M",bobbi:"F",bobbie:"F",bobby:"M",bonita:"F",bonnie:"F",boyd:"M",brad:"M",braden:"M",bradford:"M",bradley:"M",brady:"M",brain:"M",branden:"M",brandi:"F",brandie:"F",brandon:"M",brandy:"F",brannon:"M",branson:"M",braxton:"M",breanna:"F",brendan:"M",brenden:"M",brendon:"M",brenna:"F",brennan:"M",brent:"M",brenton:"M",brett:"M",brian:"M",briana:"F",brianna:"F",brice:"M",bridget:"F",bridgett:"F",bridgette:"F",brielle:"F",britt:"F",brittany:"F",brittney:"F",brock:"M",broderick:"M",brody:"M",bronwyn:"F",brook:"F",brooke:"F",brooks:"M",bruce:"M",bruno:"M",bryan:"M",bryanna:"F",bryant:"M",bryce:"M",brynn:"F",bryon:"M",buck:"M",buddy:"M",buffy:"F",burt:"M",burton:"M",buster:"M",byron:"M",cade:"M",cadence:"F",caelan:"M",caesar:"M",caitlin:"F",caitlyn:"F",cal:"M",caleb:"M",cali:"F",calista:"F",callan:"M",callie:"F",callum:"M",calvin:"M",camden:"M",cameron:"M",camila:"F",camilla:"F",camille:"F",campbell:"M",camryn:"F",candace:"F",candice:"F",candis:"F",candy:"F",cannon:"M",cara:"F",carey:"M",cari:"F",carissa:"F",carl:"M",carla:"F",carlee:"F",carley:"F",carli:"F",carlie:"F",carlisle:"M",carlos:"M",carlton:"M",carly:"F",carma:"F",carmen:"F",carol:"F",carole:"F",carolina:"F",caroline:"F",carolyn:"F",carrie:"F",carroll:"M",carson:"M",carter:"M",cary:"M",casey:"F",cash:"M",casper:"M",cassandra:"F",cassidy:"F",cassie:"F",castiel:"M",catalina:"F",catherine:"F",cathleen:"F",cathy:"F",catrina:"F",cayden:"M",cecelia:"F",cecil:"M",cecilia:"F",cedric:"M",celeste:"F",celia:"F",celina:"F",cesar:"M",chad:"M",chadwick:"M",chaim:"M",chance:"M",chandler:"M",chanel:"F",chantal:"F",chantel:"F",chantelle:"F",charity:"F",charlene:"F",charles:"M",charley:"M",charlie:"M",charlotte:"F",chase:"M",chasity:"F",chastity:"F",chauncey:"M",chelsea:"F",chelsey:"F",cheri:"F",cherie:"F",cherry:"F",cheryl:"F",chester:"M",cheyenne:"F",chiara:"F",chloe:"F",chris:"M",christa:"F",christian:"M",christiana:"F",christina:"F",christine:"F",christoper:"M",christopher:"M",chuck:"M",chyna:"F",ciara:"F",cindy:"F",clair:"F",claire:"F",clara:"F",clare:"F",clarence:"M",clarice:"F",clark:"M",claud:"M",claude:"M",claudette:"F",claudia:"F",clay:"M",clayton:"M",clement:"M",clementine:"F",cleo:"F",cliff:"M",clifford:"M",clifton:"M",clint:"M",clinton:"M",clive:"M",clyde:"M",cody:"M",colby:"M",cole:"M",coleen:"F",colin:"M",collin:"M",colt:"M",colten:"M",colton:"M",columbus:"M",conner:"M",connor:"M",conrad:"M",constance:"F",consuelo:"F",cooper:"M",cora:"F",corbin:"M",cordelia:"F",corey:"M",corina:"F",corine:"F",corinne:"F",cornelius:"M",cornell:"M",corrine:"F",cory:"M",courteney:"F",courtney:"F",coy:"M",craig:"M",crawford:"M",creighton:"M",cristal:"F",cristian:"M",cristina:"F",cristobal:"M",crockett:"M",cruz:"M",crystal:"F",cullen:"M",curt:"M",curtis:"M",cynthia:"F",cyril:"M",cyrus:"M",daisy:"F",dakota:"M",dale:"M",daleyza:"F",dallas:"M",dalton:"M",damaris:"F",damian:"M",damien:"M",damion:"M",damon:"M",dan:"M",dana:"F",dane:"M",danette:"F",daniel:"M",daniela:"F",daniele:"F",danielle:"F",danika:"F",danny:"M",dante:"M",daphne:"F",darci:"F",darcy:"F",daren:"M",daria:"F",darin:"M",darius:"M",darnell:"M",darrel:"M",darrell:"M",darren:"M",darrin:"M",darryl:"M",daryl:"M",dave:"M",david:"M",davin:"M",davis:"M",dawn:"F",dawson:"M",dayana:"F",dayna:"F",dayton:"M",deacon:"M",deandre:"M",deann:"F",deanna:"F",deanne:"F",deb:"F",debbi:"F",debbie:"F",debera:"F",deborah:"F",debra:"F",dee:"F",deena:"F",deepak:"M",deidra:"F",deirdre:"F",delaney:"F",delbert:"M",delia:"F",delilah:"F",delinda:"F",delmar:"M",delmer:"M",delores:"F",deloris:"F",demarcus:"M",demetrius:"M",dena:"F",denice:"F",denis:"M",denise:"F",dennis:"M",denny:"M",denzel:"M",denzil:"M",deon:"M",derek:"M",derick:"M",derrick:"M",deshawn:"M",desi:"M",desiree:"F",desmond:"M",destinee:"F",destiny:"F",devan:"M",deven:"M",devin:"M",devon:"M",dewayne:"M",dewey:"M",dexter:"M",dezmond:"M",diamond:"F",diana:"F",diane:"F",dianna:"F",dianne:"F",dick:"M",diego:"M",dillon:"M",dina:"F",dinah:"F",dino:"M",dion:"M",dirk:"M",dixie:"F",dolly:"F",dolores:"F",dominic:"M",dominick:"M",dominique:"F",don:"M",dona:"F",donald:"M",donata:"F",donavan:"M",donell:"M",donella:"F",donita:"F",donn:"M",donna:"F",donnie:"M",donny:"M",donovan:"M",dora:"F",doreen:"F",dorian:"M",doris:"F",dorothea:"F",dorothy:"F",doug:"M",douglas:"M",doyle:"M",drake:"M",drew:"M",duane:"M",dudley:"M",duke:"M",duncan:"M",dustin:"M",dusty:"M",dwain:"M",dwayne:"M",dwight:"M",dylan:"M",earl:"M",earleen:"F",earlene:"F",earnest:"M",easter:"F",ebony:"F",echo:"F",ed:"M",eddie:"M",eddy:"M",eden:"F",edgar:"M",edith:"F",edmond:"M",edmund:"M",edna:"F",eduardo:"M",edward:"M",edwardo:"M",edwin:"M",edwina:"F",efrain:"M",efren:"M",eileen:"F",elaina:"F",elaine:"F",elbert:"M",elder:"M",eleanor:"F",elektra:"F",elena:"F",elias:"M",elijah:"M",elinor:"F",elisa:"F",elisabeth:"F",elise:"F",elisha:"M",elissa:"F",eliza:"F",elizabeth:"F",elizabet:"F",ella:"F",ellen:"F",ellery:"M",ellie:"F",elliot:"M",elliott:"M",ellis:"M",ellison:"M",elma:"F",elmer:"M",elmira:"F",elois:"F",eloise:"F",elouise:"F",elsa:"F",elsie:"F",elton:"M",elva:"F",elvera:"F",elvia:"F",elvin:"M",elvira:"F",elvis:"M",elwood:"M",elyse:"F",emaline:"F",emanuel:"M",emerald:"F",emerson:"M",emery:"F",emil:"M",emile:"M",emilee:"F",emilia:"F",emilie:"F",emilio:"M",emily:"F",emma:"F",emmanuel:"M",emmett:"M",emmy:"F",emory:"M",enid:"F",ennis:"M",enoch:"M",enrique:"M",ephraim:"M",erasmo:"M",eric:"M",erica:"F",erich:"M",erick:"M",ericka:"F",erik:"M",erika:"F",erin:"F",erinn:"F",erla:"F",ernest:"M",ernestine:"F",ernesto:"M",ernie:"M",errol:"M",ervin:"M",erwin:"M",esmeralda:"F",esperanza:"F",essa:"F",essie:"F",esteban:"M",estella:"F",estelle:"F",ester:"F",esther:"F",ethan:"M",eugene:"M",eugenia:"F",eula:"F",eunice:"F",evan:"M",evangelina:"F",eve:"F",evelyn:"F",everett:"M",evette:"F",evie:"F",ezekiel:"M",ezra:"M",fabian:"M",fabiola:"F",faith:"F",faye:"F",fedora:"F",felecia:"F",felice:"F",felicia:"F",felipe:"M",felisha:"F",felix:"M",ferdinand:"M",fern:"F",fernando:"M",fidel:"M",fiona:"F",flavia:"F",fletcher:"M",flora:"F",florence:"F",florencio:"M",florian:"M",floyd:"M",flynn:"M",forrest:"M",foster:"M",frances:"F",francesca:"F",francine:"F",francis:"M",francisca:"F",francisco:"M",frank:"M",frankie:"F",franklin:"M",frazier:"M",fred:"M",freda:"F",freddie:"M",freddy:"M",frederic:"M",frederick:"M",fredrick:"M",freeman:"M",freya:"F",frieda:"F",fritz:"M",gabe:"M",gabriel:"M",gabriela:"F",gabriella:"F",gabrielle:"F",gael:"F",gage:"M",gail:"F",gale:"F",galen:"M",garland:"M",garrett:"M",garry:"M",garth:"M",garvin:"M",gary:"M",gaspar:"M",gaston:"M",gavin:"M",gay:"F",gayle:"F",gaylord:"M",gene:"M",geneva:"F",genevieve:"F",genna:"F",gennifer:"F",geoff:"M",geoffrey:"M",george:"M",georgia:"F",georgina:"F",gerald:"M",geraldine:"F",gerard:"M",gerardo:"M",german:"M",gerry:"M",gertrude:"F",gianna:"F",gigi:"F",gilbert:"M",gilda:"F",gillian:"F",gina:"F",ginger:"F",gino:"M",giovanni:"M",gisel:"F",giselle:"F",gizelle:"F",gladys:"F",glen:"M",glenda:"F",glenn:"M",glenna:"F",gloria:"F",glory:"F",golden:"F",goldie:"F",gordon:"M",grace:"F",gracelyn:"F",graciela:"F",grady:"M",graham:"M",grant:"M",gray:"M",grayce:"F",grayson:"M",greer:"F",greg:"M",gregg:"M",gregorio:"M",gregory:"M",gretchen:"F",griffin:"M",grover:"M",guadalupe:"F",guillermo:"M",gunnar:"M",gunther:"M",gus:"M",gustavo:"M",gwen:"F",gwendolyn:"F",hadley:"F",hailee:"F",hailey:"F",hal:"M",haleigh:"F",haley:"F",halle:"F",hallie:"F",hamilton:"M",hank:"M",hanna:"F",hannah:"F",hans:"M",harlan:"M",harley:"F",harmony:"F",harold:"M",harper:"F",harriet:"F",harrison:"M",harry:"M",harvey:"M",hasan:"M",hassan:"M",havana:"F",hayden:"M",haylee:"F",hayley:"F",hazel:"F",heath:"M",heather:"F",heaven:"F",hector:"M",hedy:"F",heidi:"F",helen:"F",helena:"F",helene:"F",henrietta:"F",henry:"M",herb:"M",herbert:"M",heriberto:"M",herman:"M",herminia:"F",herschel:"M",hester:"F",hettie:"F",hillary:"F",hilton:"M",hiram:"M",hobart:"M",holden:"M",holli:"F",hollie:"F",hollis:"M",holly:"F",homer:"M",hope:"F",horace:"M",horatio:"M",hortense:"F",hosea:"M",houston:"M",howard:"M",hubert:"M",huey:"M",hugh:"M",hugo:"M",humberto:"M",humphrey:"M",hunter:"M",ian:"M",ida:"F",ignacio:"M",ike:"M",ila:"F",ilene:"F",ilianna:"F",iliana:"F",ilona:"F",imogene:"F",ina:"F",inez:"F",inga:"F",ingrid:"F",inocencio:"M",ira:"M",irene:"F",iris:"F",irma:"F",irvin:"M",irving:"M",irwin:"M",isaac:"M",isabel:"F",isabella:"F",isabelle:"F",isaiah:"M",isaias:"M",isaura:"F",isiah:"M",isidro:"M",isla:"F",ismael:"M",isobel:"F",israel:"M",issac:"M",iva:"F",ivana:"F",ivory:"F",ivy:"F",jabari:"M",jace:"M",jack:"M",jackeline:"F",jackie:"F",jacklyn:"F",jackson:"M",jaclyn:"F",jacob:"M",jacquelin:"F",jacqueline:"F",jacquelyn:"F",jacques:"M",jade:"F",jaden:"M",jadyn:"F",jaime:"M",jaimie:"F",jake:"M",jakob:"M",jakobe:"M",jaleesa:"F",jamal:"M",jamar:"M",jamel:"M",james:"M",jameson:"M",jamie:"F",jamil:"M",jamison:"M",jana:"F",janay:"F",jane:"F",janel:"F",janell:"F",janelle:"F",janessa:"F",janet:"F",janette:"F",janie:"F",janine:"F",janis:"F",janna:"F",jannie:"F",jannifer:"F",jared:"M",jarod:"M",jarred:"M",jarrett:"M",jarrod:"M",jasmine:"F",jason:"M",jasper:"M",javier:"M",jax:"M",jaxon:"M",jay:"M",jayce:"M",jaycee:"F",jayda:"F",jayden:"M",jayla:"F",jaylen:"M",jayson:"M",jayvon:"M",jazlyn:"F",jazmin:"F",jazmine:"F",jean:"F",jeanette:"F",jeanie:"F",jeanine:"F",jeanne:"F",jeannette:"F",jeannie:"F",jeannine:"F",jed:"M",jeff:"M",jeffery:"M",jeffrey:"M",jeffry:"M",jena:"F",jenelle:"F",jenifer:"F",jenna:"F",jenni:"F",jennie:"F",jennifer:"F",jennings:"M",jenny:"F",jerald:"M",jeramie:"M",jeramy:"M",jere:"M",jeremiah:"M",jeremie:"M",jeremy:"M",jermaine:"M",jerod:"M",jerome:"M",jerrell:"M",jerrod:"M",jerry:"M",jess:"F",jesse:"M",jessenia:"F",jessica:"F",jessie:"F",jessika:"F",jesus:"M",jett:"M",jewel:"F",jewell:"F",jill:"F",jillian:"F",jim:"M",jimmy:"M",joan:"F",joann:"F",joanna:"F",joanne:"F",job:"M",jocelyn:"F",jock:"M",jodi:"F",jodie:"F",jody:"F",joe:"M",joel:"M",joelle:"F",joesph:"M",joey:"M",johan:"M",johanna:"F",johathan:"M",john:"M",johnathan:"M",johnathon:"M",johnie:"M",johnnie:"M",johnny:"M",johnpaul:"M",johnson:"M",jolene:"F",jolie:"F",jon:"M",jona:"M",jonah:"M",jonas:"M",jonathan:"M",jonathon:"M",joni:"F",jonie:"F",jordan:"F",jordyn:"F",jorge:"M",jose:"M",josef:"M",josefa:"F",josefina:"F",joseline:"F",joseph:"M",josepha:"F",josephine:"F",josette:"F",josh:"M",joshua:"M",joshue:"M",josiah:"M",josie:"F",josue:"M",joy:"F",joyce:"F",joycelyn:"F",juan:"M",juana:"F",juanita:"F",judah:"M",judd:"M",jude:"M",judith:"F",judy:"F",jules:"M",julia:"F",julian:"M",juliana:"F",juliann:"F",julianna:"F",julianne:"F",julie:"F",julienne:"F",juliet:"F",juliette:"F",julio:"M",julissa:"F",julius:"M",june:"F",junior:"M",junious:"M",justin:"M",justina:"F",justine:"F",justice:"F",kacey:"F",kaci:"F",kacie:"F",kaden:"M",kadin:"M",kae:"F",kaelyn:"F",kahlil:"M",kai:"M",kaila:"F",kailey:"F",kaitlin:"F",kaitlyn:"F",kala:"F",kaleb:"M",kaleigh:"F",kaley:"F",kali:"F",kallie:"F",kamari:"M",kameron:"M",kami:"F",kamila:"F",kamilah:"F",kampbell:"F",kandace:"F",kane:"M",kara:"F",karan:"F",kareem:"M",karen:"F",kari:"F",karie:"F",karim:"M",karin:"F",karina:"F",karissa:"F",karla:"F",karlee:"F",karly:"F",karma:"F",karol:"M",karolina:"F",karrie:"F",kary:"M",kasey:"F",kash:"M",kasie:"F",kassandra:"F",kassidy:"F",kate:"F",katelin:"F",katelyn:"F",katelynn:"F",katerina:"F",kathaleen:"F",katharina:"F",katherine:"F",katheryn:"F",kathie:"F",kathleen:"F",kathrine:"F",kathryn:"F",kathy:"F",katie:"F",katina:"F",katlin:"F",katlyn:"F",katrina:"F",kay:"F",kaya:"F",kayce:"F",kaycee:"F",kaye:"F",kayla:"F",kaylee:"F",kayleigh:"F",kayley:"F",kaylin:"F",kaytlin:"F",keanu:"M",keaton:"M",keegan:"M",keelan:"M",keenan:"M",keena:"F",keisha:"F",keith:"M",kellen:"M",keller:"M",kelley:"F",kelli:"F",kellie:"F",kelly:"F",kelsey:"F",kelton:"M",kelvin:"M",kely:"F",kemuel:"M",ken:"M",kenan:"M",kendall:"F",kendra:"F",kendrick:"M",kenisha:"F",kennedy:"F",kenneth:"M",kennith:"M",kenny:"M",kent:"M",kenton:"M",kenya:"F",kenyatta:"F",kenyon:"M",keon:"M",keri:"F",kerrie:"F",kerry:"F",kesha:"F",keshia:"F",kevin:"M",khadijah:"F",khalil:"M",kian:"M",kiara:"F",kiefer:"M",kiera:"F",kieran:"M",kierra:"F",kiesha:"F",kiley:"F",killian:"M",kim:"F",kimber:"F",kimberley:"F",kimberly:"F",kimora:"F",kinsey:"F",kira:"F",kirby:"M",kirk:"M",kisha:"F",kishia:"F",kit:"M",kitten:"F",kittie:"F",kitty:"F",kjell:"M",klara:"F",kody:"M",kohen:"M",kole:"M",kolton:"M",korbin:"M",korey:"M",kory:"M",kourtney:"F",kris:"M",krishna:"M",krista:"F",kristal:"F",kristan:"F",kristen:"F",kristi:"F",kristian:"M",kristie:"F",kristin:"F",kristina:"F",kristine:"F",kristopher:"M",kristy:"F",krystal:"F",krystle:"F",kurt:"M",kurtis:"M",kyla:"F",kyle:"M",kylee:"F",kyleigh:"F",kyler:"M",kylie:"F",kyra:"F",lacey:"F",lachlan:"M",lacy:"F",laddie:"M",lady:"F",laiken:"F",laila:"F",lailani:"F",laine:"F",laken:"F",lakeisha:"F",lakesha:"F",lakeya:"F",lamar:"M",lambert:"M",lamont:"M",lana:"F",lance:"M",landen:"M",landon:"M",landry:"F",lane:"M",laney:"F",langston:"M",lanie:"F",lanny:"M",laraine:"F",lareina:"F",larissa:"F",larry:"M",lars:"M",larson:"M",lary:"M",lashawn:"F",lassie:"F",latanya:"F",latarsha:"F",latasha:"F",latisha:"F",latonia:"F",latonya:"F",latora:"F",latosha:"F",latoya:"F",latrice:"F",latricia:"F",laura:"F",lauralee:"F",lauran:"F",laurel:"F",lauren:"F",laurence:"M",lauretta:"F",laurie:"F",lauryn:"F",lavada:"F",lavelle:"M",lavern:"F",laverne:"F",lavina:"F",lavinia:"F",lavon:"F",lavonne:"F",lawanda:"F",lawanna:"F",lawrence:"M",lawson:"M",layla:"F",layne:"M",layton:"M",lazaro:"M",le:"M",lea:"F",leah:"F",lean:"M",leander:"M",leandra:"F",leann:"F",leanna:"F",leanne:"F",leatha:"F",leatrice:"F",leland:"M",lelia:"F",lena:"F",lenard:"M",lenora:"F",lenore:"F",leo:"M",leola:"F",leon:"M",leona:"F",leonard:"M",leonardo:"M",leonce:"M",leonel:"M",leonie:"F",leonor:"F",leonora:"F",leopold:"M",leora:"F",leroy:"M",les:"M",lesa:"F",lesley:"F",leslie:"F",lesly:"F",lessie:"F",lester:"M",letitia:"F",levi:"M",levinia:"F",lewis:"M",lexi:"F",lexie:"F",liam:"M",liana:"F",libby:"F",lidia:"F",lien:"F",lila:"F",lilia:"F",lilian:"F",liliana:"F",lillian:"F",lillie:"F",lilly:"F",lily:"F",lincoln:"M",linda:"F",lindsay:"F",lindsey:"F",lindy:"F",linette:"F",linwood:"M",lionel:"M",lisa:"F",lisabeth:"F",lisandra:"F",lisbeth:"F",lisette:"F",lise:"F",lisha:"F",lissa:"F",lissette:"F",lita:"F",liz:"F",liza:"F",lizabeth:"F",lizbeth:"F",lizette:"F",lizzie:"F",lloyd:"M",loan:"F",lola:"F",lois:"F",lona:"F",london:"F",lone:"F",lonette:"F",loni:"F",lonnie:"M",lonny:"M",lora:"F",loraine:"F",loray:"F",lorelei:"F",loren:"F",lorena:"F",lorene:"F",lorenz:"M",lorenza:"F",lorenzo:"M",loreta:"F",loretta:"F",lori:"F",loriann:"F",lorie:"F",lorin:"M",lorinda:"F",lorine:"F",lorita:"F",lorna:"F",lorraine:"F",lorretta:"F",lorrie:"F",lottie:"F",lou:"M",louella:"F",louie:"M",louis:"M",louisa:"F",louise:"F",lourdes:"F",louvenia:"F",lovella:"F",lovely:"F",lowe:"M",lowell:"M",loyce:"F",luann:"F",luca:"M",lucas:"M",luce:"F",lucero:"F",lucia:"F",lucian:"M",luciana:"F",lucianna:"F",lucie:"F",lucien:"M",lucienne:"F",luciile:"F",lucila:"F",lucilla:"F",lucille:"F",lucina:"F",lucio:"M",lucious:"M",lucita:"F",lucky:"M",lucrecia:"F",lucretia:"F",lucy:"F",ludie:"F",ludivina:"F",lue:"F",lueann:"F",luella:"F",luevenia:"F",luigi:"M",luis:"M",luisa:"F",lukas:"M",luke:"M",lula:"F",lulu:"F",luna:"F",lupe:"F",lupita:"F",lura:"F",luther:"M",luz:"F",lyda:"F",lydia:"F",lyla:"F",lyn:"F",lynda:"F",lyndia:"F",lyndon:"M",lyndsey:"F",lynette:"F",lynn:"F",lynne:"F",lynnette:"F",lynsey:"F",lynton:"M",lyonel:"M",lyric:"F",mabel:"F",mable:"F",mac:"M",macey:"F",machelle:"F",maci:"F",macie:"F",mack:"M",mackenzie:"F",macy:"F",madaline:"F",madalyn:"F",madalyne:"F",maddison:"F",maddy:"F",madelaine:"F",madeleine:"F",madelene:"F",madelin:"F",madeline:"F",madelyn:"F",madelynn:"F",madge:"F",madison:"F",madlyn:"F",madonna:"F",mae:"F",maegan:"F",magan:"F",magda:"F",magdalen:"F",magdalena:"F",magdalene:"F",magen:"F",maggie:"F",magnolia:"F",magnus:"M",maia:"F",maida:"F",maisie:"F",maite:"F",major:"M",makaila:"F",makala:"F",makayla:"F",makena:"F",makenna:"F",makinzie:"F",malachi:"M",malaya:"F",malcolm:"M",maleah:"F",malia:"F",malik:"M",malina:"F",malinda:"F",malissa:"F",maliyah:"F",mallie:"F",mallory:"F",malorie:"F",malvina:"F",mamie:"F",manda:"F",mandi:"F",mandie:"F",mandy:"F",manley:"M",manoj:"M",manuel:"M",manuela:"F",mara:"F",marc:"M",marcela:"F",marcella:"F",marcelle:"F",marcellus:"M",marcelo:"M",marcia:"F",marcie:"F",marcos:"M",marcus:"M",marcy:"F",mardell:"F",maren:"F",margarete:"F",margarett:"F",margaret:"F",margareta:"F",margarita:"F",margarite:"F",margaritta:"F",marge:"F",margene:"F",margeret:"F",margery:"F",marget:"F",margherita:"F",margie:"F",margin:"F",margit:"F",margo:"F",margot:"F",margret:"F",margrett:"F",marguerita:"F",marguerite:"F",mari:"F",maria:"F",mariah:"F",marian:"F",mariana:"F",mariann:"F",marianna:"F",marianne:"F",maribel:"F",maricela:"F",maricruz:"F",marie:"F",mariel:"F",mariela:"F",marietta:"F",marilee:"F",marilyn:"F",marilynn:"F",marin:"F",marina:"F",marinda:"F",marion:"F",marisa:"F",marisela:"F",marisol:"F",marissa:"F",marita:"F",maritza:"F",marjorie:"F",mark:"M",marketta:"F",markita:"F",markus:"M",marla:"F",marlana:"F",marlee:"F",marlen:"F",marlena:"F",marlene:"F",marley:"F",marlin:"M",marlo:"F",marlon:"M",marlys:"F",marnie:"F",marquetta:"F",marquis:"M",marquita:"F",marry:"F",marsha:"F",marshall:"M",marston:"M",marta:"F",martha:"F",martin:"M",marty:"M",marva:"F",marvin:"M",mary:"F",maryann:"F",maryanne:"F",marybel:"F",marybeth:"F",maryellen:"F",maryjane:"F",maryjo:"F",marylou:"F",maryrose:"F",masako:"F",mason:"M",mathias:"M",mathew:"M",matilda:"F",matilde:"F",matt:"M",matteo:"M",matthew:"M",matthias:"M",mattie:"F",maud:"F",maude:"F",maureen:"F",maura:"F",maurice:"M",mauricio:"M",mauro:"M",mavis:"F",max:"M",maxim:"M",maxime:"M",maximilian:"M",maximus:"M",maxine:"F",maxwell:"M",may:"F",maya:"F",maybell:"F",maybelline:"F",maybe:"F",mayme:"F",maynard:"M",mayra:"F",mazie:"F",mckenna:"F",mckenzie:"F",mckinley:"M",mclean:"M",mead:"M",meagan:"F",mechelle:"F",meda:"F",megan:"F",meghan:"F",mei:"F",mel:"M",melanie:"F",melany:"F",melba:"F",melda:"F",melia:"F",melina:"F",melinda:"F",melisa:"F",melissa:"F",melita:"F",mellie:"F",mellisa:"F",mellissa:"F",melodee:"F",melodi:"F",melodie:"F",melody:"F",melonie:"F",melony:"F",melva:"F",melvin:"M",melvina:"F",melynda:"F",mendy:"F",mercedes:"F",mercer:"M",mercy:"F",meredith:"F",merissa:"F",merle:"F",merlin:"M",merna:"F",merri:"F",merrie:"F",merrilee:"F",merrilyn:"F",merry:"F",merton:"M",mervin:"M",mesha:"F",meta:"F",micaela:"F",micaiah:"M",michael:"M",michaela:"F",michal:"F",michale:"M",micheal:"M",michel:"M",michele:"F",michelina:"F",michelle:"F",michiko:"F",mick:"M",mickey:"M",micki:"F",mickie:"F",micky:"F",miguel:"M",miguelina:"F",mika:"F",mikaela:"F",mike:"M",mikel:"M",mikele:"F",mikhail:"M",miki:"F",mikki:"F",mila:"F",milan:"M",milburn:"M",mildred:"F",miles:"M",milford:"M",millard:"M",millicent:"F",millie:"F",milly:"F",milo:"M",milton:"M",mimi:"F",mina:"F",mindy:"F",minerva:"F",minnie:"F",minta:"F",mira:"F",miracle:"F",miranda:"F",mireille:"F",mireya:"F",miriam:"F",mirna:"F",mirta:"F",mirtha:"F",misha:"F",misty:"F",mitchel:"M",mitchell:"M",mitsuko:"F",mittie:"F",mitzi:"F",mo:"M",mohamed:"M",mohammad:"M",mohammed:"M",moira:"F",moises:"M",mollie:"F",molly:"F",mona:"F",monica:"F",monika:"F",monique:"F",monroe:"M",monte:"M",montgomery:"M",monty:"M",moon:"F",mora:"F",moreen:"F",morey:"M",morgan:"F",moriah:"F",morris:"M",morse:"M",morton:"M",mose:"M",moses:"M",moshe:"M",moss:"M",muhammad:"M",muriel:"F",murphy:"M",murray:"M",mya:"F",myeshia:"F",myles:"M",mylo:"M",myra:"F",myrl:"F",myrle:"F",myrna:"F",myron:"M",myrta:"F",myrtle:"F",mystie:"F",mystique:"F",nadia:"F",nadine:"F",nadira:"F",naida:"F",naila:"F",nana:"F",nancy:"F",nanette:"F",nannie:"F",naoma:"F",naomi:"F",napoleon:"M",narciso:"M",nash:"M",natalia:"F",natalie:"F",nataly:"F",natasha:"F",nathalie:"F",nathan:"M",nathanael:"M",nathanial:"M",nathaniel:"M",nathania:"F",natosha:"F",neale:"M",necole:"F",ned:"M",nedra:"F",nehemiah:"M",neil:"M",nelda:"F",nell:"F",nella:"F",nellie:"F",nelson:"M",neoma:"F",neomi:"F",nerissa:"F",nessa:"F",nestor:"M",neta:"F",nettie:"F",neva:"F",nevaeh:"F",neville:"M",newton:"M",nez:"F",nia:"F",nicholas:"M",nichole:"F",nick:"M",nicki:"F",nickie:"F",nicky:"F",nicolas:"M",nicole:"F",nicolette:"F",nicolle:"F",nidia:"F",niels:"M",nigel:"M",niki:"F",nikita:"F",nikki:"F",nikole:"F",nila:"F",niles:"M",nils:"M",nina:"F",nita:"F",noah:"M",noe:"M",noel:"M",noelle:"F",noemi:"F",nola:"F",nolan:"M",noma:"F",nona:"F",nora:"F",norah:"F",norbert:"M",norberto:"M",noreen:"F",norene:"F",noretta:"F",noriko:"F",norma:"F",norman:"M",normand:"M",norris:"M",nova:"F",novella:"F",nydia:"F",oakley:"M",obed:"M",obrien:"M",octavia:"F",octavio:"M",oda:"F",odalis:"F",odd:"M",odelia:"F",odell:"M",odessa:"F",odette:"F",odilia:"F",ofelia:"F",ola:"F",olaf:"M",olan:"M",ole:"M",olene:"F",oleta:"F",olga:"F",olimpia:"F",olinda:"F",oliva:"F",oliver:"M",olivia:"F",ollie:"F",olly:"M",olympia:"F",oma:"F",omar:"M",omari:"M",omega:"F",omer:"M",ona:"F",oneida:"F",oneil:"M",oneta:"F",onita:"F",opal:"F",ophelia:"F",oracle:"F",orazio:"M",orba:"M",orchid:"F",oren:"M",oriana:"F",orilla:"F",orion:"M",orland:"M",orlando:"M",orpha:"F",orval:"M",orville:"M",oscar:"M",osie:"F",oskar:"M",osvaldo:"M",oswald:"M",otelia:"F",otha:"M",otis:"M",otto:"M",ouida:"F",ova:"F",overton:"M",owen:"M",ozella:"F",ozell:"F",ozie:"F",ozzie:"M",pablo:"M",pace:"M",pacheco:"M",pacific:"M",page:"F",paige:"F",paisley:"F",palmer:"M",paloma:"F",pam:"F",pamela:"F",pamella:"F",pancho:"M",pandora:"F",pansy:"F",paola:"F",paris:"F",parker:"M",parnell:"M",parris:"F",parry:"M",pascal:"M",pasquale:"M",pat:"F",patience:"F",patrica:"F",patrice:"F",patricia:"F",patsy:"F",patti:"F",pattie:"F",patty:"F",paul:"M",paula:"F",pauletta:"F",paulette:"F",pauline:"F",paulita:"F",paulo:"M",pauly:"M",pavel:"M",pearl:"F",pearle:"F",pearlene:"F",pearlie:"F",pedro:"M",peggy:"F",penelope:"F",penney:"F",pennie:"F",penny:"F",pepper:"F",percival:"M",percy:"M",perla:"F",pernell:"M",perry:"M",persis:"F",pete:"M",peter:"M",petra:"F",petronila:"F",petunia:"F",peyton:"F",phil:"M",philip:"M",philipa:"F",philippa:"F",phillip:"M",phillis:"F",philomena:"F",phoebe:"F",phyllis:"F",piedad:"F",pierce:"M",pierre:"M",piers:"M",piper:"F",polly:"F",pompey:"M",poppy:"F",porter:"M",portia:"F",prentice:"M",prescott:"M",presley:"F",preston:"M",price:"M",princess:"F",priscilla:"F",prudence:"F",prudy:"F",pryor:"M",queen:"F",queenie:"F",quentin:"M",quiana:"F",quincy:"M",quinn:"F",quinten:"M",quintin:"M",quinton:"M",rachael:"F",racheal:"F",rachel:"F",rachelle:"F",rachyl:"F",rae:"F",rafael:"M",raheem:"M",rahul:"M",raina:"F",raine:"F",raleigh:"M",ralph:"M",ramiro:"M",ramon:"M",ramona:"F",ramses:"M",randal:"M",randall:"M",randi:"F",randolph:"M",randy:"M",raphael:"M",raquel:"F",rashad:"M",rashawn:"M",rasheeda:"F",raul:"M",raven:"F",ray:"M",raya:"F",raymon:"M",raymond:"M",raymundo:"M",rayna:"F",rayne:"F",reba:"F",rebecca:"F",rebeccah:"F",rebekah:"F",reda:"F",redd:"M",redina:"F",reed:"M",reese:"F",refugia:"F",refugio:"M",regan:"F",regina:"F",reginald:"M",reid:"M",reilly:"F",reina:"F",remington:"M",remy:"M",rena:"F",renae:"F",renaldo:"M",renardo:"M",renata:"F",renate:"F",renda:"F",rene:"M",renee:"F",renita:"F",rennell:"M",rennie:"F",reva:"F",rex:"M",rey:"M",reyna:"F",reynaldo:"M",rhea:"F",rhett:"M",rhiannon:"F",rhoda:"F",rhonda:"F",ria:"F",ricardo:"M",ricci:"M",rich:"M",richard:"M",richie:"M",rick:"M",rickey:"M",ricki:"F",rickie:"M",ricky:"M",rico:"M",rigby:"F",rigoberto:"M",riley:"F",rilla:"F",rima:"F",rin:"F",rina:"F",ringo:"M",rio:"M",ripley:"F",rita:"F",robb:"M",robbie:"M",robbin:"F",robbyn:"F",robby:"M",robert:"M",roberta:"F",roberto:"M",robin:"F",robt:"M",roby:"M",robyn:"F",rochelle:"F",rock:"M",rocky:"M",rod:"M",roddy:"M",roderick:"M",rodger:"M",rodney:"M",rodolfo:"M",rodrick:"M",rodrigo:"M",rogelio:"M",roger:"M",roland:"M",rolanda:"F",rolando:"M",roldan:"M",roletta:"F",rolf:"M",rolland:"M",rolle:"M",rollin:"M",roman:"M",rome:"M",romeo:"M",romona:"F",ron:"M",ronald:"M",ronalda:"F",ronan:"M",ronda:"F",ronica:"F",ronnie:"M",ronny:"M",roosevelt:"M",rory:"M",rosa:"F",rosalba:"F",rosalee:"F",rosaleigh:"F",rosalia:"F",rosalie:"F",rosalina:"F",rosalind:"F",rosalinda:"F",rosalyn:"F",rosamond:"F",rosana:"F",rosanna:"F",rosanne:"F",rosario:"F",rosco:"M",roscoe:"M",rose:"F",roseann:"F",roseanna:"F",roseanne:"F",roselia:"F",roselle:"F",roselyn:"F",rosemarie:"F",rosemary:"F",rosetta:"F",rosette:"F",roshelle:"F",rosia:"F",rosie:"F",rosina:"F",rosita:"F",roslyn:"F",ross:"M",rossana:"F",rossie:"F",rosy:"F",rowan:"M",rowe:"M",rowena:"F",roxann:"F",roxanna:"F",roxanne:"F",roxie:"F",roxy:"F",roy:"M",royal:"M",royce:"M",rozanne:"F",rubert:"M",ruben:"M",rubi:"F",rubie:"F",ruby:"F",rudolf:"M",rudolph:"M",rudy:"M",rufus:"M",ruger:"M",rupert:"M",russ:"M",russel:"M",russell:"M",rusti:"F",rusty:"M",ruthe:"F",ruth:"F",ruthann:"F",ruthanne:"F",ryan:"M",ryann:"F",ryder:"M",rylan:"M",sabina:"F",sabine:"F",sabrina:"F",sacha:"M",sachi:"F",sachiko:"F",sade:"F",sadie:"F",sage:"F",sahra:"F",saige:"F",sally:"F",salome:"F",salvador:"M",salvatore:"M",sam:"M",samantha:"F",samara:"F",samatha:"F",sameer:"M",sami:"M",samir:"M",samira:"F",sammie:"M",sammy:"M",sampson:"M",samson:"M",samual:"M",samuel:"M",samy:"M",sana:"F",sanda:"F",sandie:"F",sandra:"F",sandy:"F",sanjay:"M",santana:"M",santiago:"M",santos:"M",sara:"F",sarah:"F",sarai:"F",sarina:"F",sarita:"F",sasha:"F",saturnino:"M",saul:"M",saundra:"F",savanna:"F",savannah:"F",savina:"F",scot:"M",scott:"M",scottie:"M",scotty:"M",sean:"M",season:"F",sebastian:"M",sebrina:"F",selby:"M",selena:"F",selene:"F",selina:"F",selma:"F",semaj:"M",seneca:"M",seraphina:"F",sereena:"F",serena:"F",serenity:"F",serge:"M",sergio:"M",seth:"M",seymour:"M",shae:"F",shaina:"F",shakira:"F",shana:"F",shanda:"F",shane:"M",shanel:"F",shanell:"F",shanelle:"F",shani:"F",shanice:"F",shaniece:"F",shanika:"F",shanita:"F",shanna:"F",shannah:"F",shannon:"F",shanon:"F",shanta:"F",shantae:"F",shantel:"F",shantell:"F",shante:"F",shanti:"F",shaquana:"F",shaquille:"M",shari:"F",sharice:"F",sharleen:"F",sharlyn:"F",sharon:"F",sharonda:"F",sharri:"F",sharron:"F",sharyl:"F",shaun:"M",shauna:"F",shaunna:"F",shavon:"F",shavonne:"F",shawanda:"F",shawn:"M",shawna:"F",shawnda:"F",shawne:"F",shawnee:"F",shay:"F",shayla:"F",shayna:"F",shayne:"M",shea:"F",sheba:"F",shedrick:"M",sheena:"F",sheila:"F",shelia:"F",shell:"F",shella:"F",shellby:"F",shellie:"F",shelly:"F",shelton:"M",shena:"F",shenna:"F",shepherd:"M",sheree:"F",sheri:"F",sheridan:"F",sherie:"F",sherill:"F",sherlyn:"F",sherman:"M",sheron:"F",sherree:"F",sherri:"F",sherrie:"F",sherril:"F",sherrill:"F",sherron:"F",sherry:"F",sherwood:"M",sheryl:"F",shiela:"F",shilo:"M",shiloh:"F",shirley:"F",shirleen:"F",shirlene:"F",shirly:"F",shonda:"F",shonna:"F",shon:"M",shorty:"M",shoshana:"F",shyanne:"F",shyla:"F",shyann:"F",sian:"F",sid:"M",sidney:"M",sienna:"F",sierra:"F",signa:"F",signe:"F",signy:"F",sigrid:"F",sigmund:"M",silas:"M",silena:"F",silva:"F",silvana:"F",silvia:"F",silvio:"M",simon:"M",simona:"F",simone:"F",simonne:"F",sincere:"M",sindy:"F",siobhan:"F",sissy:"F",skila:"F",skye:"F",skyler:"F",slade:"M",sloan:"F",slyvia:"F",smith:"M",socorro:"F",sofia:"F",sol:"M",solange:"F",solenne:"F",soledad:"F",solomon:"M",somer:"F",sondra:"F",sonia:"F",sonja:"F",sonny:"M",sonya:"F",sophia:"F",sophie:"F",sorah:"F",soraya:"F",sparkle:"F",spencer:"M",spike:"M",stacey:"F",staci:"F",stacie:"F",stacy:"F",stan:"M",stanford:"M",stanley:"M",stanton:"M",starla:"F",starr:"F",stasia:"F",stefan:"M",stefani:"F",stefanie:"F",stefany:"F",stella:"F",stepan:"M",steph:"F",stephaine:"F",stephani:"F",stephanie:"F",stephany:"F",stephen:"M",stephenie:"F",steve:"M",steven:"M",stevie:"F",stevon:"M",stewart:"M",storm:"F",stormi:"F",stormy:"F",stuart:"M",sue:"F",sueann:"F",suede:"F",sugar:"F",sukey:"F",suki:"F",sullivan:"M",sully:"M",summer:"F",sun:"F",sunny:"F",susan:"F",susana:"F",susann:"F",susanna:"F",susannah:"F",susanne:"F",susie:"F",susy:"F",suzan:"F",suzann:"F",suzanna:"F",suzanne:"F",suzette:"F",suzie:"F",suzy:"F",sven:"M",swade:"M",swan:"F",swathi:"F",sybil:"F",sydney:"F",sydnie:"F",sylas:"M",sylvester:"M",sylvia:"F",sylvie:"F",tabatha:"F",tabetha:"F",tabitha:"F",tad:"M",talia:"F",talisa:"F",talisha:"F",talitha:"F",tallulah:"F",talon:"M",tamala:"F",tamara:"F",tamatha:"F",tameka:"F",tamera:"F",tami:"F",tamie:"F",tamika:"F",tamiko:"F",tamisha:"F",tammi:"F",tammie:"F",tammy:"F",tamra:"F",tana:"F",tandi:"F",tandra:"F",tandy:"F",taneka:"F",tanesha:"F",tangela:"F",tania:"F",tanika:"F",tanisha:"F",tanja:"F",tanner:"M",tanya:"F",tara:"F",taren:"F",tariq:"M",tarra:"F",tarsha:"F",taryn:"F",tasha:"F",tashia:"F",tasia:"F",tate:"M",tatum:"F",tatyana:"F",taurean:"M",tawana:"F",tawanda:"F",tawanna:"F",tawna:"F",tawni:"F",tawnya:"F",taylor:"F",teagan:"F",ted:"M",teddy:"M",telly:"M",temeka:"F",tempest:"F",temple:"F",tena:"F",tenesha:"F",tenisha:"F",tenley:"F",tennille:"F",teodoro:"M",tequila:"F",terence:"M",teresa:"F",terese:"F",teresia:"F",teresita:"F",teri:"F",terra:"F",terre:"F",terrence:"M",terri:"F",terrie:"F",terrill:"F",terry:"M",tessa:"F",tess:"F",tessie:"F",thad:"M",thaddeus:"M",thalia:"F",thanh:"M",thea:"F",thelma:"F",theo:"M",theodora:"F",theodore:"M",theola:"F",theresa:"F",therese:"F",theresia:"F",theron:"M",thomas:"M",thomasina:"F",thora:"F",thorn:"M",thorne:"M",thornton:"M",thurman:"M",thuy:"F",tia:"F",tiana:"F",tiara:"F",tiera:"F",tierra:"F",tiesha:"F",tiffany:"F",tifany:"F",tiffani:"F",tiffanie:"F",tiffiny:"F",tiger:"M",tilda:"F",tilden:"M",tillie:"F",tilly:"F",tim:"M",timika:"F",timmy:"M",timothy:"M",tina:"F",tinker:"M",tisha:"F",titus:"M",tobi:"F",tobias:"M",tobie:"F",toby:"M",toccara:"F",todd:"M",toi:"F",tom:"M",tomas:"M",tomeka:"F",tomer:"M",tomi:"F",tomika:"F",tommie:"M",tommy:"M",tommylee:"M",tona:"F",toni:"F",tonia:"F",tonie:"F",tonja:"F",tony:"M",tonya:"F",tonyia:"F",torey:"F",tori:"F",torie:"F",torrance:"M",torre:"M",torrence:"M",torrey:"F",torrie:"F",tory:"F",tosha:"F",toshia:"F",tova:"F",tovah:"F",towanda:"F",toya:"F",trace:"M",tracee:"F",tracey:"F",traci:"F",tracie:"F",tracy:"F",tramaine:"M",tramell:"M",tran:"F",trang:"F",travares:"M",travis:"M",treasure:"F",trena:"F",trent:"M",trenton:"M",trevion:"M",trevor:"M",trey:"M",tricia:"F",trina:"F",trinh:"F",trinidad:"F",trinity:"F",trish:"F",trisha:"F",trista:"F",tristan:"M",tristen:"M",tristian:"M",tristin:"M",troy:"M",trudi:"F",trudie:"F",trudy:"F",trula:"F",truman:"M",tu:"F",tucker:"M",tuesday:"F",tula:"F",tully:"M",tupac:"M",turner:"M",tuyet:"F",twila:"F",twyla:"F",ty:"M",tyesha:"F",tyisha:"F",tyla:"F",tyler:"M",tyman:"M",tymothy:"M",tynisha:"F",tyra:"F",tyree:"M",tyrell:"M",tyrese:"M",tyrik:"M",tyrone:"M",tyson:"M",ubaldo:"M",uden:"M",ugene:"M",ulises:"M",ulla:"F",ulysses:"M",uma:"F",umberto:"M",una:"F",unice:"F",unique:"F",unknown:"M",upton:"M",uriah:"M",uriel:"M",ursula:"F",usher:"M",usnavy:"M",ution:"M",uze:"M",vada:"F",val:"M",valarie:"F",valda:"F",valencia:"F",valentina:"F",valentine:"M",valeria:"F",valerie:"F",valery:"F",valinda:"F",valla:"F",valorie:"F",van:"M",vance:"M",vanda:"F",vanessa:"F",vanetta:"F",vania:"F",vanita:"F",vanna:"F",vannie:"F",vanzandt:"M",vard:"F",velda:"F",velma:"F",velva:"F",velvet:"F",vena:"F",venessa:"F",venetta:"F",venice:"F",venita:"F",vennie:"F",venus:"F",vera:"F",verda:"F",verdell:"F",verdie:"F",verena:"F",vergie:"F",verla:"F",verlene:"F",verline:"F",vern:"M",verna:"F",vernell:"F",vernetta:"F",vernia:"F",vernice:"F",vernie:"F",vernon:"M",verona:"F",veronica:"F",versa:"F",vertie:"F",vester:"M",veta:"F",veva:"F",vi:"F",vic:"M",vickey:"F",vicki:"F",vickie:"F",vicky:"F",victor:"M",victoria:"F",victorina:"F",victorine:"F",victory:"F",vida:"F",vidal:"M",vienna:"F",viet:"M",viggo:"M",vikki:"F",vila:"F",vilma:"F",vim:"M",vina:"F",vinay:"M",vince:"M",vincent:"M",vincenza:"F",vincenzo:"M",vine:"M",vinnie:"M",vinny:"M",vinson:"M",viola:"F",violet:"F",violeta:"F",violete:"F",virge:"M",virgie:"F",virgil:"M",virgina:"F",virginia:"F",virginio:"M",vita:"F",vito:"M",viva:"F",vivek:"M",vivi:"F",vivian:"F",viviana:"F",vivienne:"F",vlad:"M",vladimir:"M",volker:"M",von:"M",vonda:"F",vonnie:"F",wade:"M",wadell:"M",wagner:"M",waino:"M",wake:"M",wakefield:"M",waldo:"M",waldon:"M",walker:"M",wallace:"M",wally:"M",walter:"M",walton:"M",waltraud:"F",wanda:"F",waneta:"F",wanetta:"F",wanisha:"F",wanita:"F",wanna:"F",wanner:"M",ward:"M",warlen:"M",warner:"M",warren:"M",washington:"M",watson:"M",wava:"F",waylon:"M",wayne:"M",webb:"M",webster:"M",weldon:"M",wellington:"M",wells:"M",welsh:"M",wenda:"F",wendell:"M",wendi:"F",wendie:"F",wendy:"F",wesley:"M",west:"M",westin:"M",westley:"M",weston:"M",whit:"M",whitney:"F",whittaker:"M",wilber:"M",wilbert:"M",wilbur:"M",wilburn:"M",wiley:"M",wilford:"M",wilfred:"M",wilfredo:"M",wilhelm:"M",wilhelmina:"F",wilkes:"M",wilkie:"M",will:"M",willa:"F",willard:"M",willem:"M",willene:"F",willette:"F",william:"M",williams:"M",willian:"M",willie:"M",willis:"M",willodean:"F",willow:"F",willy:"M",wilma:"F",wilmer:"M",wilson:"M",wilton:"M",windy:"F",winfield:"M",winfred:"M",winifred:"F",winnie:"F",winona:"F",winslow:"M",winston:"M",wint:"M",winthrop:"M",winton:"M",wise:"M",wistar:"M",wolf:"M",wolfgang:"M",wood:"M",woodrow:"M",woodson:"M",woody:"M",worden:"M",wray:"M",wright:"M",wyatt:"M",wylie:"M",wyndham:"M",wynell:"F",wynn:"F",wynona:"F",wynter:"F",xander:"M",xandra:"F",xanthe:"F",xavier:"M",xaviera:"F",xena:"F",xenia:"F",xerxes:"M",xiao:"F",xochil:"F",xochitl:"F",xylina:"F",yadira:"F",yahir:"M",yael:"F",yajaira:"F",yana:"F",yancey:"M",yang:"M",yara:"F",yardley:"F",yasmeen:"F",yasmin:"F",yasmine:"F",yazmin:"F",yehuda:"M",yen:"F",yer:"M",yesenia:"F",yessenia:"F",yetta:"F",yin:"F",yisrael:"M",yoana:"F",yoel:"M",yolanda:"F",yolonda:"F",yon:"M",yong:"M",yonina:"F",york:"M",yosef:"M",yoshie:"F",yoshiko:"F",yoshio:"M",young:"M",yount:"M",yu:"F",yul:"M",yulanda:"F",yulisa:"F",yumi:"F",yuridia:"F",yuriko:"F",yusef:"M",yusuf:"M",yvette:"F",yvone:"F",yvonne:"F",zachariah:"M",zachary:"M",zachery:"M",zack:"M",zackary:"M",zada:"F",zadie:"F",zahra:"F",zaida:"F",zaina:"F",zak:"M",zakary:"M",zana:"F",zane:"M",zara:"F",zaria:"F",zayna:"F",zayne:"M",zechariah:"M",zed:"M",zelda:"F",zelma:"F",zena:"F",zenaida:"F",zenia:"F",zenobia:"F",zeph:"M",zephaniah:"M",zero:"M",zeus:"M",zia:"F",zilpha:"F",zina:"F",zinnia:"F",zita:"F",zoe:"F",zofia:"F",zoie:"F",zoila:"F",zola:"F",zona:"F",zora:"F",zoraida:"F",zula:"F",zulma:"F",zuri:"F",zyanya:"F",zymaria:"F"};

let lg,rt,results=[],busy=false,stopF=false;

// ─── localStorage 持久化结果 ───
const LK=SK+'_res';
function svResults(r){try{localStorage.setItem(LK,JSON.stringify(r))}catch(e){}}
function ldResults(){try{return JSON.parse(localStorage.getItem(LK))}catch(e){}return null}
function clResults(){try{localStorage.removeItem(LK)}catch(e){}}

const st=document.createElement('style');st.textContent=`
#uspb-p{position:fixed;top:10px;right:10px;width:340px;max-height:90vh;
background:linear-gradient(135deg,#87CEEB,#B0E0E6);color:#333;border:2px solid #6CB4D9;
border-radius:15px;padding:12px;font-size:13px;z-index:999999;
font-family:Segoe UI,sans-serif;box-shadow:0 5px 25px rgba(0,0,0,.3);
display:flex;flex-direction:column;overflow-y:auto}
#uspb-p h3{color:#FF69B4;margin:0 0 5px 0;font-size:14px;text-shadow:1px 1px 0 rgba(255,255,255,.5)}
#uspb-p textarea{width:100%;height:65px;background:#fff;color:#333;
border:1px solid #6CB4D9;border-radius:8px;padding:5px;font-size:12px;
font-family:monospace;resize:vertical;box-sizing:border-box}
#uspb-p input,#uspb-p select{background:#fff;color:#333;border:1px solid #6CB4D9;
border-radius:6px;padding:3px 5px;font-size:12px}
#uspb-p select{width:70px}
#uspb-p input[type=number]{width:40px}
#uspb-p .r{display:flex;align-items:center;gap:4px;margin:3px 0;flex-wrap:wrap}
#uspb-p .r label{font-size:12px;color:#555;min-width:30px}
#uspb-p .btn{background:#FF69B4;color:#fff;border:none;border-radius:8px;
padding:5px 10px;cursor:pointer;font-size:12px;font-weight:bold;margin:2px;box-shadow:0 2px 4px rgba(0,0,0,.15)}
#uspb-p .btn:hover{background:#FF1493;transform:scale(1.03)}
#uspb-p .btn:disabled{opacity:.5;cursor:not-allowed;transform:none}
#uspb-p .dng{background:#FF6347}#uspb-p .grn{background:#32CD32}
#uspb-p .log{background:#fff;border:1px solid #6CB4D9;border-radius:8px;padding:5px;font-size:11px;
font-family:monospace;height:110px;overflow-y:auto;margin-top:4px;white-space:pre-wrap;word-break:break-all;color:#333}
#uspb-p .log .ok{color:#228B22}#uspb-p .log .warn{color:#FF8C00}#uspb-p .log .err{color:#DC143C}
#uspb-p .bar{height:4px;background:#B0E0E6;border-radius:2px;margin:4px 0}
#uspb-p .bar-in{height:100%;background:#FF69B4;border-radius:2px;width:0%}
#uspb-p .stat{display:flex;justify-content:space-between;font-size:11px;color:#555}
`;
document.head.appendChild(st);

function l(m,c){if(!lg)return;const d=document.createElement('div');if(c)d.className=c;d.textContent=m;lg.appendChild(d);lg.scrollTop=lg.scrollHeight}

function sr(r){
    if(!rt)return;
    const ptxt=r.pt||'未知';
    const gender=r.gender?' ['+r.gender+']':'';
    const line=[r.name||'',r.ph||'',ptxt,(r.addr||'').slice(0,20),r.age||'',gender];
    rt.textContent+=line.join(' | ')+'\n';rt.scrollTop=rt.scrollHeight;
}

function isStopped(){const s=ld();return s&&s._stop===true;}

// ─── Cloudflare 检测 ───
function isCF(){
    try{
        const t=document.title;
        return /Attention|blocked|Just a moment/i.test(t)||document.body.textContent.includes('Checking your browser');
    }catch(e){return false}
}
function sl(ms){return new Promise(r=>setTimeout(r,ms))}
function sv(s){try{sessionStorage.setItem(SK,JSON.stringify(s))}catch(e){}try{localStorage.setItem(SK,JSON.stringify(s))}catch(e){}}
function ld(){try{return JSON.parse(sessionStorage.getItem(SK))||JSON.parse(localStorage.getItem(SK))}catch(e){}return null}
function cl(){try{sessionStorage.removeItem(SK)}catch(e){}try{localStorage.removeItem(SK)}catch(e){}}
function esc(s){if(!s)return'""';s=String(s).replace(/"/g,'""');return'"'+s+'"'}
function dc(s){try{const k=parseInt(s.slice(0,2),16);let r='';for(let i=2;i<s.length;i+=2)r+=String.fromCharCode(parseInt(s.slice(i,i+2),16)^k);return r}catch(e){return s}}

// ─── 性别推断 (本地映射 + 启发式兜底) ───
const G2={"aamir":"M","aarav":"M","abdullah":"M","abram":"M","ace":"M","adair":"M","adalberto":"M","adonis":"M","agustin":"M","ahmad":"M","ahmed":"M","aiden":"M","akeem":"M","al":"M","alain":"M","alastair":"M","alec":"M","alejandro":"M","alen":"M","alexandro":"M","alfredo":"M","ali":"M","alijah":"M","alistair":"M","allan":"M","alonso":"M","alonzo":"M","alphonse":"M","alton":"M","alvaro":"M","amari":"M","amarion":"M","amos":"M","andre":"M","andres":"M","andy":"M","angel":"M","angelo":"M","ansel":"M","ansley":"M","antione":"M","antoine":"M","antoinio":"M","antoni":"M","antwan":"M","apollo":"M","archie":"M","aris":"M","armando":"M","armani":"M","armin":"M","arnold":"M","aron":"M","art":"M","artemis":"M","arturo":"M","aryan":"M","asher":"M","ashley":"M","atlas":"M","aubrey":"M","august":"M","aurelio":"M","austin":"M","avery":"M","avis":"M","axl":"M","bacilio":"M","barney":"M","barret":"M","bastian":"M","bayard":"M","beauregard":"M","berkley":"M","binyamin":"M","boden":"M","bodie":"M","bo":"M","boone":"M","borden":"M","bowen":"M","boyce":"M","bradly":"M","brayan":"M","brayden":"M","braydon":"M","briar":"M","brogan":"M","bronson":"M","bruce":"M","bryant":"M","brycen":"M","bryson":"M","buck":"M","bud":"M","buddy":"M","burt":"M","buster":"M","byron":"M","cade":"M","cael":"M","caelan":"M","caiden":"M","cal":"M","callahan":"M","callan":"M","callum":"M","cam":"M","camden":"M","cameron":"M","campbell":"M","cannon":"M","carlisle":"M","carson":"M","carter":"M","casen":"M","casey":"M","cash":"M","cassian":"M","cassidy":"M","cato":"M","chaim":"M","chance":"M","chandler":"M","channing":"M","charlie":"M","chas":"M","chasity":"M","chester":"M","chico":"M","chris":"M","christapher":"M","christian":"M","christoper":"M","cillian":"M","clark":"M","claudio":"M","clay":"M","clayton":"M","clement":"M","cleo":"M","cliff":"M","clint":"M","coby":"M","codey":"M","coen":"M","cole":"M","colin":"M","collin":"M","colson":"M","colt":"M","colten":"M","connor":"M","conor":"M","conrad":"M","cooper":"M","corbin":"M","cordell":"M","corey":"M","cory":"M","creed":"M","curt":"M","cy":"M","cyril":"M","dakota":"M","dangelo":"M","darnell":"M","darrel":"M","darren":"M","darrin":"M","darryl":"M","davon":"M","dax":"M","dayton":"M","deacon":"M","deandre":"M","declan":"M","deion":"M","del":"M","delbert":"M","demarco":"M","demarcus":"M","demetrius":"M","denis":"M","denver":"M","deon":"M","derek":"M","derick":"M","deshaun":"M","deshawn":"M","desmond":"M","devan":"M","devante":"M","deven":"M","devonte":"M","dhruv":"M","dick":"M","diego":"M","dillan":"M","dillon":"M","dino":"M","dion":"M","dirk":"M","dominic":"M","dominick":"M","dominik":"M","don":"M","donavan":"M","donell":"M","donnie":"M","donny":"M","donovan":"M","dorian":"M","douglas":"M","doyle":"M","draco":"M","drake":"M","draven":"M","drew":"M","dudley":"M","duke":"M","duncan":"M","dustin":"M","dusty":"M","dwayne":"M","dwight":"M","dylan":"M","easton":"M","ed":"M","eddie":"M","eddy":"M","edison":"M","edmond":"M","efrain":"M","efren":"M","elbert":"M","elder":"M","elian":"M","elias":"M","elio":"M","elisha":"M","ellery":"M","elliot":"M","elliott":"M","ellis":"M","ellison":"M","elmer":"M","elton":"M","elvin":"M","elvis":"M","emanuel":"M","emerson":"M","emery":"M","emil":"M","emiliano":"M","emilio":"M","emmanuel":"M","emmett":"M","ennis":"M","enoch":"M","enrico":"M","enrique":"M","enzo":"M","ephraim":"M","erasmo":"M","erick":"M","erik":"M","ernesto":"M","ernie":"M","errol":"M","ervin":"M","esteban":"M","estevan":"M","ethan":"M","eusebio":"M","evan":"M","everett":"M","ezekiel":"M","ezra":"M","fabian":"M","faron":"M","federico":"M","felipe":"M","felix":"M","ferdinand":"M","fidel":"M","finnegan":"M","fisher":"M","flint":"M","florentino":"M","florian":"M","floyd":"M","flynn":"M","ford":"M","forest":"M","forrest":"M","foster":"M","francis":"M","francisco":"M","frank":"M","frankie":"M","franklin":"M","fred":"M","freddie":"M","freddy":"M","frederic":"M","fredrick":"M","freeman":"M","fritz":"M","gabe":"M","gabriel":"M","gaige":"M","garland":"M","garret":"M","garrett":"M","garry":"M","garth":"M","gaspar":"M","gaston":"M","gavin":"M","gene":"M","geoff":"M","geoffrey":"M","george":"M","gerald":"M","gerard":"M","gerardo":"M","gerry":"M","giovani":"M","giovanni":"M","giuseppe":"M","glen":"M","glenn":"M","gonzalo":"M","gordon":"M","grady":"M","graham":"M","grant":"M","grecian":"M","gregg":"M","gregorio":"M","greyson":"M","griffin":"M","guillermo":"M","gunnar":"M","gunther":"M","gus":"M","gustavo":"M","hakeem":"M","hal":"M","hamza":"M","hank":"M","hans":"M","harlan":"M","harley":"M","harmon":"M","harold":"M","harper":"M","harrison":"M","harvey":"M","hasan":"M","hassan":"M","hayden":"M","heath":"M","hector":"M","hendrix":"M","henri":"M","henry":"M","herb":"M","herbert":"M","heriberto":"M","herman":"M","herschel":"M","hezekiah":"M","hilario":"M","hilton":"M","hiram":"M","hobart":"M","holden":"M","homer":"M","horace":"M","horatio":"M","hosea":"M","houston":"M","howard":"M","hoyt":"M","hubert":"M","huey":"M","hugh":"M","hugo":"M","humberto":"M","humphrey":"M","hunter":"M","hussein":"M","ian":"M","ignacio":"M","ike":"M","immanuel":"M","irvin":"M","irving":"M","irwin":"M","isaac":"M","isaiah":"M","isaias":"M","ishmael":"M","isiah":"M","isidro":"M","ismael":"M","israel":"M","issac":"M","ito":"M","ivan":"M","ivory":"M","jabari":"M","jace":"M","jack":"M","jackson":"M","jacob":"M","jaden":"M","jadon":"M","jaime":"M","jake":"M","jakob":"M","jakobe":"M","jaleel":"M","jamal":"M","jamar":"M","jamel":"M","jameson":"M","jamie":"M","jamil":"M","jamison":"M","jaren":"M","jaron":"M","jase":"M","jasen":"M","jay":"M","jayce":"M","jayceon":"M","jayden":"M","jaylen":"M","jayson":"M","jayvon":"M","jean":"M","jed":"M","jedidiah":"M","jeff":"M","jeffery":"M","jeffry":"M","jerald":"M","jeramie":"M","jeramy":"M","jere":"M","jeremie":"M","jermaine":"M","jerod":"M","jerrell":"M","jerrod":"M","jess":"M","jesse":"M","jesus":"M","jett":"M","jim":"M","jimmy":"M","joaquin":"M","joe":"M","joel":"M","joesph":"M","joey":"M","johannes":"M","johnathan":"M","johnathon":"M","johnie":"M","johnnie":"M","johnny":"M","jona":"M","jonah":"M","jonas":"M","jordan":"M","jordy":"M","jorge":"M","jose":"M","josef":"M","joseph":"M","josh":"M","joshua":"M","joshue":"M","josiah":"M","josue":"M","jovan":"M","joziah":"M","juan":"M","judah":"M","judd":"M","jude":"M","julian":"M","julio":"M","julius":"M","junior":"M","justin":"M","kade":"M","kaden":"M","kadin":"M","kaeden":"M","kahlil":"M","kai":"M","kale":"M","kaleb":"M","kalel":"M","kamari":"M","kameron":"M","kane":"M","kareem":"M","karim":"M","karson":"M","kasey":"M","kash":"M","kason":"M","keanu":"M","keaton":"M","keegan":"M","keelan":"M","keenan":"M","keith":"M","kellen":"M","keller":"M","kelton":"M","kelvin":"M","ken":"M","kenan":"M","kendall":"M","kendrick":"M","kenneth":"M","kennith":"M","kenny":"M","kent":"M","kenton":"M","kenyon":"M","keon":"M","kevin":"M","khalil":"M","kian":"M","kiefer":"M","kieran":"M","killian":"M","kim":"M","king":"M","kip":"M","kirby":"M","kirk":"M","kit":"M","kody":"M","kohen":"M","kole":"M","kolton":"M","korbin":"M","korey":"M","kory":"M","kris":"M","kristian":"M","kristopher":"M","kurt":"M","kurtis":"M","kyan":"M","kyle":"M","kyler":"M","kymani":"M","kyree":"M","kyson":"M","laine":"M","lamar":"M","lambert":"M","lamont":"M","lance":"M","landen":"M","landon":"M","lane":"M","langston":"M","lanny":"M","larry":"M","lars":"M","larson":"M","lawrence":"M","lawson":"M","layne":"M","layton":"M","lazaro":"M","le":"M","leander":"M","leland":"M","len":"M","lenard":"M","leo":"M","leon":"M","leonard":"M","leonardo":"M","leonce":"M","leonel":"M","leopold":"M","leroy":"M","les":"M","lester":"M","levi":"M","lewis":"M","liam":"M","lincoln":"M","linwood":"M","lionel":"M","lloyd":"M","logan":"M","lonnie":"M","lonny":"M","lou":"M","louie":"M","louis":"M","lowell":"M","luca":"M","lucas":"M","lucian":"M","lucien":"M","lucio":"M","lucious":"M","lucky":"M","luigi":"M","luis":"M","lukas":"M","luke":"M","luther":"M","lyle":"M","lyndon":"M","lynton":"M","mac":"M","mack":"M","major":"M","malachi":"M","malcolm":"M","malik":"M","manuel":"M","marc":"M","marcel":"M","marcelo":"M","marco":"M","Marcos":"M","marcus":"M","mario":"M","marion":"M","marques":"M","marquez":"M","marquis":"M","marshall":"M","martin":"M","mateo":"M","mathew":"M","matias":"M","matt":"M","maurice":"M","mauricio":"M","maverick":"M","max":"M","maxim":"M","maximiliano":"M","maximillian":"M","maxwell":"M","mckinley":"M","mekhi":"M","mel":"M","melvin":"M","merle":"M","merlin":"M","merton":"M","micah":"M","michael":"M","michale":"M","miguel":"M","mike":"M","mikel":"M","miles":"M","millard":"M","milo":"M","milton":"M","mohammad":"M","mohammed":"M","moises":"M","monroe":"M","monte":"M","montana":"M","montgomery":"M","monty":"M","morgan":"M","morris":"M","mortimer":"M","morton":"M","moses":"M","moshe":"M","muhammad":"M","murphy":"M","murray":"M","mustafa":"M","myles":"M","myron":"M","nathan":"M","nathanael":"M","nathanial":"M","nathaniel":"M","neal":"M","neil":"M","nelson":"M","nestor":"M","nicholas":"M","nick":"M","nickolas":"M","nicolas":"M","nigel":"M","nikhil":"M","nikko":"M","niko":"M","nikolas":"M","niles":"M","nixon":"M","noah":"M","noble":"M","noe":"M","noel":"M","nolan":"M","norbert":"M","norman":"M","norris":"M","numbers":"M","octavio":"M","odd":"M","ode":"M","odell":"M","odin":"M","olaf":"M","olen":"M","olin":"M","oliver":"M","ollie":"M","omer":"M","omri":"M","oran":"M","orlando":"M","orrin":"M","orville":"M","oscar":"M","osvaldo":"M","othello":"M","otis":"M","otto":"M","owen":"M","pablo":"M","pace":"M","paco":"M","palmer":"M","paris":"M","parker":"M","parnell":"M","parry":"M","pat":"M","patsy":"M","patterson":"M","paul":"M","pedro":"M","percy":"M","perry":"M","pete":"M","peter":"M","phil":"M","philip":"M","phillip":"M","pierce":"M","pierre":"M","porter":"M","prentice":"M","presley":"M","preston":"M","price":"M","prince":"M","quentin":"M","quincey":"M","quincy":"M","quinn":"M","quirino":"M","quyen":"M","rachid":"M","rafael":"M","raheem":"M","rahman":"M","raleigh":"M","ralph":"M","ramiro":"M","ramon":"M","randal":"M","randall":"M","randell":"M","randolph":"M","randy":"M","raphael":"M","rashad":"M","rashawn":"M","raul":"M","ray":"M","raymon":"M","raymond":"M","reagan":"M","reece":"M","reed":"M","reese":"M","refugio":"M","reginald":"M","reid":"M","reilly":"M","reinaldo":"M","reiner":"M","remington":"M","remy":"M","renaldo":"M","renato":"M","rene":"M","reuben":"M","rex":"M","rey":"M","reynaldo":"M","rhett":"M","rhys":"M","ricardo":"M","rickey":"M","rickie":"M","ricky":"M","rico":"M","rigoberto":"M","riley":"M","rio":"M","rob":"M","robby":"M","robert":"M","roberto":"M","robin":"M","rocky":"M","rod":"M","roddy":"M","roderick":"M","rodney":"M","rodolfo":"M","rodrick":"M","rodrigo":"M","rogelio":"M","roger":"M","roland":"M","rolando":"M","roman":"M","romeo":"M","ron":"M","ronald":"M","ronnie":"M","ronny":"M","roosevelt":"M","rory":"M","roscoe":"M","ross":"M","rossie":"M","rowan":"M","roy":"M","royal":"M","royce":"M","ruben":"M","rudolph":"M","rudy":"M","rufus":"M","rupert":"M","russel":"M","russell":"M","rusty":"M","ryan":"M","ryder":"M","ryker":"M","rylan":"M","rylee":"M","sahil":"M","sal":"M","salvador":"M","salvatore":"M","sam":"M","sammie":"M","sammy":"M","sampson":"M","samson":"M","samuel":"M","sandy":"M","santana":"M","santiago":"M","santo":"M","santos":"M","saul":"M","sawyer":"M","scot":"M","scott":"M","scottie":"M","scotty":"M","sean":"M","sebastian":"M","sedrick":"M","shad":"M","shane":"M","shannon":"M","shaquille":"M","shayne":"M","shaun":"M","shawn":"M","shayne":"M","shea":"M","shedrick":"M","sheldon":"M","shelton":"M","sherman":"M","shirley":"M","silas":"M","sincere":"M","skylar":"M","skyler":"M","slade":"M","sloan":"M","sly":"M","sol":"M","solomon":"M","sonny":"M","spencer":"M","stacey":"M","stan":"M","stanford":"M","stanley":"M","stefan":"M","steph":"M","stephan":"M","sterling":"M","steve":"M","steven":"M","stevie":"M","stewart":"M","stetson":"M","stone":"M","stuart":"M","sullivan":"M","sylvester":"M","tad":"M","tal":"M","tanner":"M","tate":"M","taylor":"M","tevin":"M","tex":"M","thad":"M","thaddeus":"M","theo":"M","theodore":"M","thomas":"M","thor":"M","tiberius":"M","tim":"M","timmy":"M","timothy":"M","titus":"M","tobias":"M","tobin":"M","todd":"M","tom":"M","tomas":"M","tommy":"M","tony":"M","torey":"M","tori":"M","torrance":"M","torrence":"M","torrey":"M","tracy":"M","travis":"M","tre":"M","tremaine":"M","tremayne":"M","trent":"M","trenton":"M","trever":"M","trevin":"M","trevion":"M","trevor":"M","trey":"M","trip":"M","tripp":"M","tristan":"M","tristen":"M","tristian":"M","troy":"M","truman":"M","tucker":"M","turner":"M","ty":"M","tyler":"M","tyree":"M","tyreek":"M","tyrel":"M","tyrell":"M","tyrese":"M","tyrik":"M","tyriq":"M","tyrone":"M","tyson":"M","ulises":"M","ulrich":"M","ulysses":"M","uriah":"M","vance":"M","vaughn":"M","vicente":"M","victor":"M","vincent":"M","vincenzo":"M","virgil":"M","vito":"M","vladimir":"M","von":"M","wade":"M","waldo":"M","walker":"M","wallace":"M","wally":"M","walter":"M","walton":"M","ward":"M","warner":"M","warren":"M","washington":"M","watson":"M","weldon":"M","weston":"M","whitney":"M","wilber":"M","wilbert":"M","wilbur":"M","wiley":"M","wilford":"M","wilfred":"M","wilfredo":"M","will":"M","william":"M","willie":"M","willis":"M","willy":"M","wilmer":"M","wilson":"M","wilton":"M","windell":"M","winfield":"M","winford":"M","winston":"M","wylie":"M","wyman":"M","xander":"M","xavier":"M","xavian":"M","yaakov":"M","yadiel":"M","yahir":"M","yardley":"M","yehuda":"M","yosef":"M","yusuf":"M","zachariah":"M","zachary":"M","zachery":"M","zack":"M","zackary":"M","zackery":"M","zahir":"M","zaiden":"M","zaire":"M","zayden":"M","zayn":"M","zayne":"M","zeb":"M","zebedee":"M","zebulon":"M","zeke":"M","zeph":"M","zephaniah":"M","zeus":"M","zion":"M"}
function guessGender(name){
    try{
        const fn=name.split(/[\s,]+/)[0].toLowerCase().replace(/[^a-z]/g,'');
        // 1. 本地映射精确匹配
        const r=G[fn]||G2[fn];
        if(r)return r;
        // 2. 启发式: 常见女性结尾
        if(/ina$|ette$|elle$|anne$|eigh$|ie$|ina$|inda$|issa$|icia$|ista$/.test(fn))return 'F';
        // 3. 启发式: a/ia/ra 结尾（大部分女性名）
        if(/[ae]a$|ia$|ra$|na$/.test(fn)&&!/(adam|nick|jos|ishma)/i.test(fn)){
            // 排除常见男性名以a结尾的
            const maleAEnd=['elisha','joshua','jeremiah','isaiah','jonah','noah','zechariah','obadiah','hezekiah','ezra'];
            if(!maleAEnd.includes(fn))return 'F';
        }
        // 4. 长度和结尾辅助判断
        if(fn.length>3&&/[^aeiouy]y$/.test(fn))return 'F';
        // 5. 默认返回 null (不做假设, 通过性别过滤器放行)
        return null;
    }catch(e){return null}
}

function xt(){
    const r={fn:'',ph:'',pt:'',addr:'',age:'',em:'',allph:'',gender:'',ace:"M",alistair:"M",ansel:"M",apollo:"M",atlas:"M",bodie:"M",bowen:"M",briar:"M",brogan:"M",brycen:"M",callahan:"M",casen:"M",cassian:"M",channing:"M",coen:"M",colson:"M",creed:"M",dangelo:"M",dax:"M",dean:"M",declan:"M",denver:"M",dhruv:"M",draco:"M",draven:"M",easton:"M",edison:"M",elian:"M",elio:"M",enzo:"M",finnegan:"M",fisher:"M",flint:"M",greyson:"M",hendrix:"M",hussein:"M",jayceon:"M",johannes:"M",king:"M",knox:"M",koa:"M",kyan:"M",kyree:"M",kyson:"M",marcel:"M",mario:"M",mateo:"M",maverick:"M",montana:"M",nico:"M",noble:"M",odin:"M",prince:"M",rhys:"M",sawyer:"M",stetson:"M",tripp:"M",ulrich:"M",vicente:"M",wilder:"M",xavian:"M",zaire:"M",zayden:"M",zion:"M",ainsley:"F",alina:"F",alora:"F",amaris:"F",amaia:"F",anniston:"F",anaya:"F",ardis:"F",aubree:"F",aubrie:"F",audrina:"F",ayleen:"F",baylee:"F",baylie:"F",bria:"F",brinley:"F",brylee:"F",calliope:"F",carolann:"F",coral:"F",coraline:"F",davina:"F",daya:"F",devyn:"F",dream:"F",dulce:"F",edie:"F",eliana:"F",ember:"F",emmie:"F",ensley:"F",esme:"F",eva:"F",evangeline:"F",everly:"F",fallon:"F",farrah:"F",fatima:"F",finley:"F",gemma:"F",greta:"F",holland:"F",honey:"F",jaelyn:"F",janice:"F",jersey:"F",kailani:"F",kailyn:"F",kalel:"M",kambria:"F",kandi:"F",katy:"F",keely:"F",kiana:"F",kori:"F",lainey:"F",lara:"F",leticia:"F",lina:"F",linnea:"F",londyn:"F",love:"F",neve:"F",noa:"F",novah:"F",remi:"F",romy:"F",scarlett:"F",skylar:"F",sterling:"M",tatiana:"F",wren:"F",zendaya:"F",zoey:"F"};
    try{
        const ne=document.querySelector('span[itemprop="name"].header-name, h1 span.header-name');
        if(ne)r.fn=ne.textContent.trim();
        const tel=document.querySelector('span[itemprop="telephone"]');
        if(tel){
            r.ph=tel.textContent.trim();
            let foundType='未知';
            const ps=tel.parentElement?.querySelector('.phone-sub-category');
            if(ps&&ps.textContent.trim())foundType=ps.textContent.trim();
            else{
                let el=tel.parentElement;
                for(let i=0;i<5&&el;i++){
                    const txt=el.textContent||'';
                    if(/Landline|LandLine/i.test(txt)){foundType='Landline';break}
                    if(/Wireless|Cell|Mobile/i.test(txt)){foundType='Wireless';break}
                    el=el.parentElement||el.parentNode;
                }
            }
            if(foundType==='未知'){
                const bt=document.body.textContent||'';
                const idx=bt.indexOf(r.ph);
                if(idx>0){const around=bt.substring(Math.max(0,idx-200),idx+200);
                    if(/Landline|LandLine/i.test(around))foundType='Landline';
                    else if(/Wireless|Cell|Mobile/i.test(around))foundType='Wireless';}
            }
            r.pt=foundType;
        }
        const at=document.querySelectorAll('[itemprop="telephone"]');const se=new Set();const ps2=[];
        at.forEach(el=>{const t=el.textContent.trim();if(t&&!se.has(t)){se.add(t);ps2.push(t)}});r.allph=ps2.join(' | ');
        const ae=document.querySelector('a[href^="/address/"] p, a[href^="/address/"]');if(ae)r.addr=ae.textContent.trim();
        if(!r.addr){document.querySelectorAll('h3').forEach(h3=>{if(h3.textContent.includes('Current Address')){const p=h3.closest('div')?.nextElementSibling?.querySelector('p');if(p)r.addr=p.textContent.trim()}})}
        const ageE=document.querySelector('p.ls_contacts__age');if(ageE)r.age=ageE.textContent.trim();
        const ems=[];document.querySelectorAll('ul.emailslist li a').forEach(el=>{const cf=el.querySelector('span.__cf_email__');if(cf?.dataset?.cfemail)ems.push(dc(cf.dataset.cfemail));else{const t=el.textContent.trim();if(t.includes('@'))ems.push(t)}});r.em=ems.join(' | ');
        // 从页面标题推断性别
        const h1=document.querySelector('h1');
        if(h1){
            const fn=h1.textContent.trim().split(/\s+/)[0];
            const g=guessGender(fn);
            if(g)r.gender=g;
        }
    }catch(e){}return r;
}

function getLinks(){
    const u=new Set();
    document.querySelectorAll('a[href^="/"]').forEach(a=>{const h=a.getAttribute('href')||'';if(/\/[a-z-]+\/[A-Za-z0-9]{20,}/.test(h))u.add(h.startsWith('http')?h:location.origin+h)});
    return Array.from(u).filter(x=>!/\/(contact|aboutus|privacy|terms|phone|do-not-sell|notice|monitor|\d+xx)/.test(x));
}

function nameToSlug(n){return n.toLowerCase().replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,'-').replace(/-+/g,'-').replace(/^-|-$/g,'')}

// ─── 面板偏好持久化 ───
const PK=SK+'_prefs';
function svPrefs(){try{localStorage.setItem(PK,JSON.stringify({
    wl:!!(document.getElementById('uspb-wl')?.checked),
    ad:!!(document.getElementById('uspb-ad')?.checked),
    gs:!!(document.getElementById('uspb-gs')?.checked),
    gender:document.getElementById('uspb-gender')?.value||'all'
}));
}catch(e){}}
function ldPrefs(){try{return JSON.parse(localStorage.getItem(PK))}catch(e){}return null}
function restorePrefs(){
    const p=ldPrefs();if(!p)return;
    const wl=document.getElementById('uspb-wl');if(wl&&p.wl!==undefined)wl.checked=p.wl;
    const ad=document.getElementById('uspb-ad');if(ad&&p.ad!==undefined)ad.checked=p.ad;
    const gs=document.getElementById('uspb-gs');if(gs&&p.gs!==undefined)gs.checked=p.gs;
    const gd=document.getElementById('uspb-gender');if(gd&&p.gender)gd.value=p.gender;
}

// ─── 性别过滤 ───
function genderFilter(r,gender,strict){
    if(!gender||gender=='all')return true;
    const rg=r.gender||guessGender(r.name||r.fn||'');
    if(!rg)return !strict;  // 无法识别: 非严格模式放行, 严格模式排除
    return rg===gender;
}

// 严格性别过滤 (勾选后无法识别性别的会被过滤掉)
function strictGenderFilter(r,gender){
    if(!gender||gender=='all')return true;
    const rg=r.gender||guessGender(r.name||r.fn||'');
    if(!rg)return false;  // 无法识别则排除
    return rg===gender;
}

// ─── 面板 ───
function createPanel(){
    const p=document.createElement('div');p.id='uspb-p';p.innerHTML=`
        <h3>🌸 USPhoneBook 全自动批量搜索</h3>
        <div style="font-size:10px;margin:-2px 0 4px 0">✨ WebDriverWait · 新标签页 · 自适应 · Age/Wireless/性别筛选 ✨</div>
        <textarea id="uspb-i" placeholder="每行一个姓名:&#10;John Smith&#10;Jane Doe&#10;Bob Johnson"></textarea>
        <div class="r">
            <label>延迟:</label><input id="uspb-d" type="number" value="4" min="2" style="width:35px">
            <label>最小:</label><input id="uspb-mn" type="number" placeholder="年龄" style="width:35px">
            <label>~</label><input id="uspb-mx" type="number" placeholder="年龄" style="width:35px">
            <label style="margin-left:4px"><input id="uspb-wl" type="checkbox" style="width:auto"> 仅Wireless</label>
            <label style="margin-left:4px"><input id="uspb-ad" type="checkbox" style="width:auto" checked> 📥自动CSV</label>
        </div>
        <div class="r">
            <label>性别:</label>
            <select id="uspb-gender">
                <option value="all">全部</option>
                <option value="M">♂ 男</option>
                <option value="F">♀ 女</option>
            </select>
            <label style="margin-left:4px;font-size:11px"><input id="uspb-gs" type="checkbox" style="width:auto"> ⚠严格</label>
            <button class="btn" id="b-go">▶ 全自动开始</button>
            <button class="btn dng" id="b-sp" disabled>⏹</button>
            <button class="btn grn" id="b-csv">💾 CSV</button>
            <button class="btn" id="b-cl" style="background:#888">🗑</button>
        </div>
        <div class="bar"><div class="bar-in" id="uspb-bar"></div></div>
        <div class="stat"><span id="uspb-pg">0/0</span><span id="uspb-fd">结果:0</span></div>
        <div id="uspb-rt" style="background:#fff;border:1px solid #6CB4D9;border-radius:6px;padding:4px;margin:3px 0;font-size:11px;font-family:monospace;max-height:120px;overflow-y:auto;white-space:pre;color:#333"></div>
        <div class="log" id="uspb-lg"></div>
        <div style="color:#888;font-size:9px;text-align:center;margin-top:3px;padding-top:2px;border-top:1px solid #6CB4D9">💧 泪水打湿猪脚饭 · 发誓我要挣百万 💧 By.阿趣</div>
    `;
    document.body.appendChild(p);
    lg=document.getElementById('uspb-lg');
    rt=document.getElementById('uspb-rt');
    if(rt)rt.textContent='';

    const sc=p.children[1];const clr=['#FF0000','#FF7F00','#FFFF00','#00FF00','#0000FF','#4B0082','#8B00FF'];let ci=0;
    setInterval(()=>{if(sc){ci=(ci+1)%clr.length;sc.style.color=clr[ci]}},500);

    p.addEventListener('click',function(e){
        const btn=e.target.closest('button');if(!btn||!btn.id)return;
        if(btn.id==='b-go'){
            const txt=btn.textContent;
            if(txt.includes('恢复')){
                const saved=ldResults();
                if(saved&&saved.length){results=saved;l(`↻ 恢复${results.length}条结果`,'info');document.getElementById('uspb-fd').textContent='结果:'+results.length;exp()}
                else l('❌ 无可恢复结果','err');
                btn.textContent='▶ 全自动开始';
                return;
            }
            run();
        }
        else if(btn.id==='b-sp'){
            sv({_stop:true,results});
            svResults(results);  // 同步到 localStorage
            stopF=true;
            const ta=document.getElementById('uspb-i');if(ta)ta.disabled=false;
            l('⏹ 已停止,结果已保存到localStorage','warn');
        }
        else if(btn.id==='b-csv')exp();
        else if(btn.id==='b-cl'){results=[];clResults();document.getElementById('uspb-fd').textContent='结果:0';if(rt)rt.textContent='';lg.innerHTML='';l('🗑','info')}
    });

    const state=ld();
    if(state&&state._stop){
        cl();
        const saved=ldResults();
        if(saved&&saved.length){
            results=saved;
            document.getElementById('uspb-fd').textContent='结果:'+saved.length;
            l(`⏹ 已停止,有${saved.length}条结果可导出`,'warn');
            document.getElementById('b-go').textContent='▶ 恢复并导出';
        }else{
            l('⏹ 已停止','warn');
        }
        document.getElementById('b-go').disabled=false;
        const ta=document.getElementById('uspb-i');if(ta)ta.disabled=false;
        // 恢复上次的姓名列表
        const savedNames=localStorage.getItem(SK+'_names');
        if(savedNames&&ta&&!ta.value.trim())ta.value=savedNames;
        return;
    }
    if(state){
        const wlCb=document.getElementById('uspb-wl');
        if(wlCb&&state.wl!==undefined)wlCb.checked=state.wl;
        const gs=document.getElementById('uspb-gender');
        if(gs&&state.gender)gs.value=state.gender;
        const gsCb=document.getElementById('uspb-gs');
        if(gsCb&&state.gs!==undefined)gsCb.checked=state.gs;
        // 恢复姓名列表 + 锁定输入框
        const ta=document.getElementById('uspb-i');
        if(ta){
            const savedNames=localStorage.getItem(SK+'_names');
            if(savedNames&&!ta.value.trim())ta.value=savedNames;
            if(state.entries&&state.entries.length>0&&!state._stop)ta.disabled=true;
        }
        l('↻ 恢复...');
        document.getElementById('b-go').disabled=true;
        document.getElementById('b-sp').disabled=false;
        setTimeout(()=>resume(state),2000);
    }else{
        restorePrefs();
        l('💙 粘贴姓名,点▶全自动开始');
    }
    // 自动保存面板偏好
    ['uspb-wl','uspb-ad','uspb-gs','uspb-gender'].forEach(id=>{
        const el=document.getElementById(id);
        if(el)el.addEventListener('change',svPrefs);
    });
}

async function resume(state){
    const {entries,i,delay,mn,mx,detailQueue}=state;
    const wl=state.wl!==undefined?state.wl:!!(document.getElementById('uspb-wl')?.checked);
    const gender=state.gender||document.getElementById('uspb-gender')?.value||'all';
    const gs=state.gs!==undefined?state.gs:!!(document.getElementById('uspb-gs')?.checked);
    results=state.results||[];
    // 同步到 localStorage 兜底
    svResults(results);
    document.getElementById('uspb-pg').textContent=`${i+1}/${entries.length}`;
    document.getElementById('uspb-fd').textContent=`结果:${results.length}`;
    const entry=entries[i];

    // ─── CF 检测与暂停 ───
    if(isCF()){
        l('⚠️ Cloudflare 拦截！搜索暂停，通过验证后手动点▶继续','err');
        sv({entries,i,delay,mn,mx,wl,gender,detailQueue,results});
        svResults(results);
        updatePauseUI(true);
        return;
    }

    if(isStopped()){finish();return}

    if(detailQueue){
        l(`\n[${i+1}/${entries.length}] ${entry.name} 提取详情...`);
        await sl(2000);
        const r=xt();
        // 性别推断
        if(!r.gender)r.gender=guessGender(r.fn||entry.name);
        if(r.ph){
            const an=r.age?parseInt(r.age.match(/(\d+)/)?.[1]||'0'):null;
            if(!genderFilter(r,gender,gs))l(`  ⏭ ${r.ph} 性别不符`,'warn');
            else if(mn&&an!==null&&an<mn)l(`  ⏭ ${r.ph} ${an}<${mn}`,'warn');
            else if(mx&&an!==null&&an>mx)l(`  ⏭ ${r.ph} ${an}>${mx}`,'warn');
            else if(wl&&r.pt!=='Wireless'&&!r.pt.includes('Wireless'))l(`  ⏭ ${r.ph} 不是Wireless`,'warn');
            else{results.push({name:entry.name,url:location.href,...r});sr(r);l(`  ✓ ${r.ph} ${r.fn}`+(r.gender?' ['+r.gender+']':''),'ok')}
        }else l('  - 无电话','info');
        document.getElementById('uspb-fd').textContent=`结果:${results.length}`;
        svResults(results);  // 每步同步到 localStorage

        if(detailQueue.length>0){
            if(isStopped()){finish();return}
            sv({entries,i,delay,mn,mx,wl,gender,detailQueue:detailQueue.slice(1),results});
            location.href=detailQueue[0];return;
        }
        const ni=i+1;
        if(ni>=entries.length||isStopped()||stopF){finish();return}
        l(`⏳ ${delay}秒...`);await sl(delay*1000);
        if(isStopped()){finish();return}
        sv({entries,i:ni,delay,mn,mx,wl,gender,results});
        svResults(results);  // 导航前备份
        location.href='/'+nameToSlug(entries[ni].name);return;
    }

    l(`\n[${i+1}/${entries.length}] ${entry.name}`);
    let links=[];
    for(let w=0;w<30;w++){
        await sl(500);links=getLinks();if(links.length>0)break;
        const r=xt();if(r.ph){links=['_d'];break}
        if(isStopped()){finish();return}
    }
    if(!links.length||isStopped()){l('  ❌ 无结果','err');finish();return}

    if(links[0]==='_d'){
        const r=xt();
        if(!r.gender)r.gender=guessGender(r.fn||entry.name);
        if(r.ph){
            const an=r.age?parseInt(r.age.match(/(\d+)/)?.[1]||'0'):null;
            if(!genderFilter(r,gender,gs))l(`  ⏭ ${r.ph} 性别不符`,'warn');
            else if(mn&&an!==null&&an<mn)l(`  ⏭ ${r.ph}`,'warn');
            else if(mx&&an!==null&&an>mx)l(`  ⏭ ${r.ph}`,'warn');
            else if(wl&&r.pt!=='Wireless'&&!r.pt.includes('Wireless'))l(`  ⏭ ${r.ph} 不是Wireless`,'warn');
            else{results.push({name:entry.name,url:location.href,...r});sr(r);l(`  ✓ ${r.ph}`+(r.gender?' ['+r.gender+']':''),'ok')}
        }else l('  - 无电话','info');
        document.getElementById('uspb-fd').textContent=`结果:${results.length}`;
        svResults(results);
        const ni=i+1;
        if(ni>=entries.length||isStopped()||stopF){finish();return}
        l(`⏳ ${delay}秒...`);await sl(delay*1000);
        if(isStopped()){finish();return}
        sv({entries,i:ni,delay,mn,mx,wl,gender,results});
        svResults(results);
        location.href='/'+nameToSlug(entries[ni].name);return;
    }

    l(`  📋 ${links.length} 个结果`);
    if(isStopped()){finish();return}
    sv({entries,i,delay,mn,mx,wl,gender,detailQueue:links.slice(1),results});
    svResults(results);
    location.href=links[0];
}

async function run(){
    if(busy)return;
    // ─── CF 检测 ───
    if(isCF()){
        l('⚠️ 当前页面被Cloudflare拦截,请先完成验证','err');
        return;
    }
    const ta=document.getElementById('uspb-i');if(!ta)return;
    const raw=ta.value.split('\n').map(l=>l.trim()).filter(l=>l);
    const entries=raw.map(l=>{const p=l.split(',').map(x=>x.trim());return{name:p[0]||''}}).filter(e=>e.name);
    if(!entries.length){l('❌ 输入姓名','err');return}
    const delay=parseInt(document.getElementById('uspb-d').value)||4;
    const mn=parseInt(document.getElementById('uspb-mn').value)||null;
    const mx=parseInt(document.getElementById('uspb-mx').value)||null;
    const gender=document.getElementById('uspb-gender').value||'all';
    busy=true;results=[];stopF=false;
    document.getElementById('b-go').disabled=true;
    document.getElementById('b-sp').disabled=false;
    lg.innerHTML='';

    // ─── 锁定姓名输入框 + 保存原始内容 ───
    ta.disabled=true;
    try{localStorage.setItem(SK+'_names',ta.value)}catch(e){}

    const gtxt={all:'全部',M:'♂男',F:'♀女'}[gender];
    const wl=!!(document.getElementById('uspb-wl')?.checked);
    const gs=!!(document.getElementById('uspb-gs')?.checked);
    l(`▶ ${entries.length}人`+(mn||mx?' 年龄'+mn||0+'~'+mx||999:'')+(gender!='all'?' '+gtxt:'')+` 延迟${delay}s`);
    sv({entries,i:0,delay,mn,mx,wl,gender,gs,results});
    svResults(results);
    location.href='/'+nameToSlug(entries[0].name);
}

function finish(){
    // ─── 解锁姓名输入框 ───
    const ta=document.getElementById('uspb-i');if(ta)ta.disabled=false;
    busy=false;stopF=false;
    const s=ld();
    if(!s||!s._stop)cl();
    // 完成时备份结果到 localStorage
    svResults(results);
    document.getElementById('b-go').disabled=false;
    document.getElementById('b-sp').disabled=true;
    document.getElementById('uspb-bar').style.width='100%';
    const f=results.filter(r=>r.ph).length;
    l(`\n${'='.repeat(35)}\n✅ ${f}条\n${'='.repeat(35)}`,'ok');
    const adCb=document.getElementById('uspb-ad');
    if(adCb&&adCb.checked&&results.length>0){
        l('📥 自动下载中...','info');
        setTimeout(()=>{
            try{exp()}
            catch(e){l('❌ 自动下载失败,请手动点 CSV 按钮','err');l('结果已保存在浏览器 localStorage','warn')}
        },500);
    }
}

// ─── CSV导出（带性别列和过滤）───
// ─── 暂停/恢复按钮状态 ───
function updatePauseUI(paused){
    const goBtn=document.getElementById('b-go');
    const spBtn=document.getElementById('b-sp');
    if(paused){
        goBtn.textContent='▶ 恢复';
        goBtn.disabled=false;
        spBtn.disabled=true;
    }else{
        goBtn.textContent='▶ 全自动开始';
    }
}

function exp(){
    if(!results.length){l('❌ 无数据','err');return}
    const gender=document.getElementById('uspb-gender')?.value||'all';
    const strict=!!(document.getElementById('uspb-gs')?.checked);
    // 过滤
    let filtered=results;
    if(gender!='all')filtered=results.filter(r=>genderFilter(r,gender,strict));
    if(!filtered.length){l(`❌ 无${gender=='M'?'男':'女'}性结果可导出`,'err');return}
    const hd=['搜索姓名','搜索城市','搜索州','全名','当前电话','类型','所有电话(含类型)','地址','年龄','邮箱','性别','链接'];
    const rows=[hd.join(',')];
    filtered.forEach(r=>{
        const g=r.gender||guessGender(r.name||r.fn||'')||'';
        rows.push([
            r.name||'','','',r.fn||'',r.ph||'',r.pt||'',r.allph||'',
            (r.addr||'').replace(/,/g,';'),r.age||'',r.em||'',g,r.url||''
        ].map(esc).join(','));
    });
    const csv='\ufeff'+rows.join('\n');
    const b=new Blob([csv],{type:'text/csv;charset=utf-8;'});const a=document.createElement('a');
    const gtxt={all:'',M:'_male',F:'_female'}[gender];
    a.href=URL.createObjectURL(b);a.download='usphonebook_'+new Date().toISOString().slice(0,10)+gtxt+'.csv';a.click();
    l(`📥 ${a.download} (${filtered.length}条)`+(gender!='all'?' 已过滤性别':'')+(filtered.length<results.length?` ${results.length}中筛出`:` `),'info');
}

if(document.readyState==='complete')createPanel();
else window.addEventListener('load',createPanel);
})();
