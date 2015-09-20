/*
Navicat MySQL Data Transfer

Source Server         : jsp空间
Source Server Version : 50538


Target Server Type    : MYSQL
Target Server Version : 50538
File Encoding         : 65001

Date: 2015-09-20 15:03:26
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `admin_user`
-- ----------------------------
DROP TABLE IF EXISTS `admin_user`;
CREATE TABLE `admin_user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_user
-- ----------------------------

-- ----------------------------
-- Table structure for `code`
-- ----------------------------
DROP TABLE IF EXISTS `code`;
CREATE TABLE `code` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(32) DEFAULT NULL,
  `in_time` datetime DEFAULT NULL,
  `expire_time` datetime DEFAULT NULL,
  `status` int(11) DEFAULT NULL COMMENT '0未使用  1已使用',
  `type` varchar(45) DEFAULT NULL COMMENT '验证码类型',
  `target` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of code
-- ----------------------------

-- ----------------------------
-- Table structure for `collect`
-- ----------------------------
DROP TABLE IF EXISTS `collect`;
CREATE TABLE `collect` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `tid` varchar(32) DEFAULT NULL COMMENT '可以收藏shirt或topic\r\n',
  `uid` varchar(32) DEFAULT NULL,
  `in_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of collect
-- ----------------------------
INSERT INTO collect VALUES ('23', '8b0d3a613a4c431391819f51aacf5e9f', '8d6d20172c0c4acc96da28301c7a3b59', '2015-08-30 12:08:47');
INSERT INTO collect VALUES ('24', 'fd56bb862c574a12a76b15445c8bf5e3', '8d6d20172c0c4acc96da28301c7a3b59', '2015-08-30 19:43:04');
INSERT INTO collect VALUES ('25', '8c382937532a489db8e8517b39659d70', '8d6d20172c0c4acc96da28301c7a3b59', '2015-08-30 20:17:41');
INSERT INTO collect VALUES ('26', '7683721c1d554c2fb8a5f017c0b9193f', '8d6d20172c0c4acc96da28301c7a3b59', '2015-08-30 11:38:05');

-- ----------------------------
-- Table structure for `groups`
-- ----------------------------
DROP TABLE IF EXISTS `groups`;
CREATE TABLE `groups` (
  `id` varchar(32) NOT NULL DEFAULT '0',
  `groupname` varchar(255) DEFAULT NULL,
  `description` text,
  `type` varchar(16) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `uid` varchar(32) DEFAULT NULL,
  `in_time` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of groups
-- ----------------------------
INSERT INTO groups VALUES ('7cd25765144344a18b1335e2eab0145e', '水亭上寒', 'waiting for you', '电影', '/static/images/avatar.jpg', 'dc8b7cc8cb9d4c1c855b1e8984b02d49', '2015-06-16');
INSERT INTO groups VALUES ('d19424a7cf5f4263aa006e06cc439736', '世界第一等', '这是一只团结的队伍，因为他们只有一个人', '足球', '/static/images/avatar.jpg', '8d6d20172c0c4acc96da28301c7a3b59', '2015-06-16');
INSERT INTO groups VALUES ('94962e1ed5e74a6598d0e14c1606a10d', '勇敢的心', '有你的地方', '足球', '/static/images/2015/06/26/1.jpg', '8d6d20172c0c4acc96da28301c7a3b59', '2015-06-26');
INSERT INTO groups VALUES ('4577b1018929456fb85b958965293fd3', '已宕机', '魔镜面具', '足球', '/static/images/2015/06/26/I9NY.jpg', '8d6d20172c0c4acc96da28301c7a3b59', '2015-06-26');
INSERT INTO groups VALUES ('6e50476b3de6409eb234658de0bdaf62', '哦哦普朗克', '能不能把你', '足球', '/static/images/2015/06/26/PFCZ.jpg', '8d6d20172c0c4acc96da28301c7a3b59', '2015-06-26');
INSERT INTO groups VALUES ('5a5fdab4d8374e5abf868a3ffbe7d3e8', '乐在逍遥', 'rrrre', '动漫', '/static/images/2.jpg', '8d6d20172c0c4acc96da28301c7a3b59', '2015-08-29');
INSERT INTO groups VALUES ('509e5081335d44e19c50685d1516e44e', '恰似你的温柔', '一江春水向东流', '足球', '/static/images/2015/06/26/BIKX.jpg', 'dc8b7cc8cb9d4c1c855b1e8984b02d49', '2015-06-26');
INSERT INTO groups VALUES ('c48f6309c69d43f09720b9909d1e7ad0', '少年不知愁滋味', '爱上层楼，上层楼', '足球', '/static/images/2015/07/07/FKVC.jpg', 'dc8b7cc8cb9d4c1c855b1e8984b02d49', '2015-07-07');
INSERT INTO groups VALUES ('27848f2409f34190b010123943f848c4', '月末狂欢', 'wo are young', '电影', '/static/images/2015/08/30/QXIL.jpg', '8d6d20172c0c4acc96da28301c7a3b59', '2015-08-30');

-- ----------------------------
-- Table structure for `link`
-- ----------------------------
DROP TABLE IF EXISTS `link`;
CREATE TABLE `link` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `display_index` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of link
-- ----------------------------

-- ----------------------------
-- Table structure for `member`
-- ----------------------------
DROP TABLE IF EXISTS `member`;
CREATE TABLE `member` (
  `id` varchar(32) NOT NULL DEFAULT '',
  `uid` varchar(32) DEFAULT NULL,
  `gid` varchar(32) DEFAULT NULL,
  `in_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of member
-- ----------------------------
INSERT INTO member VALUES ('73826134a3ad49e98fe780b84337c5ef', 'dc8b7cc8cb9d4c1c855b1e8984b02d49', '509e5081335d44e19c50685d1516e44e', '2015-08-30 21:23:52');
INSERT INTO member VALUES ('6b549eea2d054f158379d99a18f6f436', '8d6d20172c0c4acc96da28301c7a3b59', 'd19424a7cf5f4263aa006e06cc439736', '2015-08-30 21:26:20');
INSERT INTO member VALUES ('0d5e3b4c2270404796aa7ddaf29799df', '8d6d20172c0c4acc96da28301c7a3b59', '5a5fdab4d8374e5abf868a3ffbe7d3e8', '2015-08-30 21:26:35');
INSERT INTO member VALUES ('3b37d3c5cd444385af62c256191e421a', '8d6d20172c0c4acc96da28301c7a3b59', '6e50476b3de6409eb234658de0bdaf62', '2015-08-30 21:27:00');
INSERT INTO member VALUES ('0a459564260748e283d886884c51105e', 'dc8b7cc8cb9d4c1c855b1e8984b02d49', '7cd25765144344a18b1335e2eab0145e', '2015-08-30 21:27:02');
INSERT INTO member VALUES ('3a13003fbc0646cfa4346012f39893bd', '8d6d20172c0c4acc96da28301c7a3b59', '4577b1018929456fb85b958965293fd3', '2015-08-30 21:27:08');
INSERT INTO member VALUES ('e1a677177bcb4a69a3c40cad6c78c88d', '8d6d20172c0c4acc96da28301c7a3b59', '94962e1ed5e74a6598d0e14c1606a10d', '2015-08-30 21:27:11');
INSERT INTO member VALUES ('840aae9f3d5e4c89a8325ee974be39b7', '8d6d20172c0c4acc96da28301c7a3b59', '27848f2409f34190b010123943f848c4', '2015-08-30 22:58:27');

-- ----------------------------
-- Table structure for `mission`
-- ----------------------------
DROP TABLE IF EXISTS `mission`;
CREATE TABLE `mission` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `score` int(11) DEFAULT NULL,
  `author_id` varchar(32) DEFAULT NULL,
  `in_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of mission
-- ----------------------------

-- ----------------------------
-- Table structure for `notification`
-- ----------------------------
DROP TABLE IF EXISTS `notification`;
CREATE TABLE `notification` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `message` varchar(255) DEFAULT NULL,
  `read` int(11) DEFAULT NULL COMMENT '是否已读：0默认 1已读',
  `from_author_id` varchar(32) DEFAULT NULL,
  `author_id` varchar(32) DEFAULT NULL,
  `tid` varchar(32) DEFAULT NULL,
  `rid` varchar(32) DEFAULT NULL,
  `in_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of notification
-- ----------------------------
INSERT INTO notification VALUES ('1', '回复了你的话题', '0', '8d6d20172c0c4acc96da28301c7a3b59', 'b39d893f2eec4d7ca496a9fe00d60644', '053e0ecc52c842fea267e669e15705e7', 'b2bef1c58ac047979ba76014874a1b27', '2015-07-07 14:37:14');
INSERT INTO notification VALUES ('2', '回复了你的话题', '0', '8d6d20172c0c4acc96da28301c7a3b59', 'b39d893f2eec4d7ca496a9fe00d60644', '053e0ecc52c842fea267e669e15705e7', '7406cd7fbcbf4030b7dea244ba31bf8f', '2015-07-07 14:42:18');
INSERT INTO notification VALUES ('3', '回复了你的话题', '0', '8d6d20172c0c4acc96da28301c7a3b59', 'b39d893f2eec4d7ca496a9fe00d60644', '053e0ecc52c842fea267e669e15705e7', 'c057f5b03e3f4e2993cc3e34e83e92d9', '2015-08-28 14:31:54');
INSERT INTO notification VALUES ('4', '回复了你的话题', '0', '8d6d20172c0c4acc96da28301c7a3b59', 'b39d893f2eec4d7ca496a9fe00d60644', '053e0ecc52c842fea267e669e15705e7', '97106ae15ea446209526221c83e92a6a', '2015-08-30 00:43:53');
INSERT INTO notification VALUES ('5', '回复了你的话题', '0', '8d383eb987da4200a7c20745b7437be1', 'b39d893f2eec4d7ca496a9fe00d60644', '053e0ecc52c842fea267e669e15705e7', '1f3692757b2549578aad50bba6c1761a', '2015-09-15 23:03:25');
INSERT INTO notification VALUES ('6', '回复了你的话题', '0', '8d383eb987da4200a7c20745b7437be1', '8d6d20172c0c4acc96da28301c7a3b59', '3c2efeb59cca4fb9b8d573e176652b75', '934ca8de876244d0a4d8c04660b5e553', '2015-09-15 23:04:05');
INSERT INTO notification VALUES ('7', '回复了你的话题', '0', '8d383eb987da4200a7c20745b7437be1', '8d6d20172c0c4acc96da28301c7a3b59', '3c2efeb59cca4fb9b8d573e176652b75', '2ad288ac14614c6886d8e1c777188583', '2015-09-15 23:04:08');

-- ----------------------------
-- Table structure for `reply`
-- ----------------------------
DROP TABLE IF EXISTS `reply`;
CREATE TABLE `reply` (
  `id` varchar(32) NOT NULL DEFAULT '',
  `tid` varchar(32) DEFAULT NULL,
  `content` longtext,
  `in_time` datetime DEFAULT NULL,
  `modify_time` datetime DEFAULT NULL,
  `quote` varchar(32) DEFAULT NULL COMMENT '0：未引用 非0：引用楼层id',
  `quote_content` longtext,
  `quote_author_nickname` varchar(50) DEFAULT NULL,
  `author_id` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of reply
-- ----------------------------
INSERT INTO reply VALUES ('0b63022b90e84ea6a87bfb4a976f62ff', '1a3b28f1027847bd90d90a6889296a62', '美丽的可可西里', '2015-08-27 15:14:08', null, '0', null, null, '8d6d20172c0c4acc96da28301c7a3b59');
INSERT INTO reply VALUES ('1f3692757b2549578aad50bba6c1761a', '053e0ecc52c842fea267e669e15705e7', '人人', '2015-09-15 23:03:25', null, '0', null, null, '8d383eb987da4200a7c20745b7437be1');
INSERT INTO reply VALUES ('2ad288ac14614c6886d8e1c777188583', '3c2efeb59cca4fb9b8d573e176652b75', '你什么你', '2015-09-15 23:04:08', null, '0', null, null, '8d383eb987da4200a7c20745b7437be1');
INSERT INTO reply VALUES ('586afc0f8cb942a9a183eaa206e52421', '134252690e164c698d157a18ee2153d3', '说得好', '2015-08-27 14:48:34', null, '0', null, null, '8d6d20172c0c4acc96da28301c7a3b59');
INSERT INTO reply VALUES ('934ca8de876244d0a4d8c04660b5e553', '3c2efeb59cca4fb9b8d573e176652b75', '你什么你', '2015-09-15 23:04:05', null, '0', null, null, '8d383eb987da4200a7c20745b7437be1');
INSERT INTO reply VALUES ('97106ae15ea446209526221c83e92a6a', '053e0ecc52c842fea267e669e15705e7', '飞飞飞', '2015-08-30 00:43:53', null, '0', null, null, '8d6d20172c0c4acc96da28301c7a3b59');
INSERT INTO reply VALUES ('c057f5b03e3f4e2993cc3e34e83e92d9', '053e0ecc52c842fea267e669e15705e7', '一二三四', '2015-08-28 14:31:53', null, '0', null, null, '8d6d20172c0c4acc96da28301c7a3b59');

-- ----------------------------
-- Table structure for `section`
-- ----------------------------
DROP TABLE IF EXISTS `section`;
CREATE TABLE `section` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `tab` varchar(45) DEFAULT NULL,
  `display_index` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of section
-- ----------------------------

-- ----------------------------
-- Table structure for `shirt`
-- ----------------------------
DROP TABLE IF EXISTS `shirt`;
CREATE TABLE `shirt` (
  `id` varchar(32) NOT NULL COMMENT '短袖表',
  `title` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL COMMENT '作品\r\n',
  `in_time` datetime DEFAULT NULL,
  `modify_time` datetime DEFAULT NULL,
  `author_id` varchar(32) DEFAULT NULL,
  `reposted` int(11) DEFAULT NULL COMMENT '1:转载 0：原创',
  `top` int(11) DEFAULT NULL COMMENT '1: 置顶  0：默认',
  `good` int(11) DEFAULT NULL COMMENT '1: 精华 0：默认',
  PRIMARY KEY (`id`),
  KEY `author_id` (`author_id`),
  CONSTRAINT `shirt_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shirt
-- ----------------------------
INSERT INTO shirt VALUES ('0fab046a8263470795de2c11e1de6e12', 'numerone', '/static/images/2015/08/28/2SWM.jpg', '2015-08-29 00:55:33', null, '8d6d20172c0c4acc96da28301c7a3b59', null, '0', '0');
INSERT INTO shirt VALUES ('3e00ce5edf5849a1b8a473b79d28a90b', '得到', '/static/images/2015/08/28/C4TF.jpg', '2015-08-29 22:52:04', null, '8d6d20172c0c4acc96da28301c7a3b59', null, '0', '0');
INSERT INTO shirt VALUES ('7683721c1d554c2fb8a5f017c0b9193f', '我屮艸芔茻', '/static/images/tt/tt1.jpg', '2015-08-29 22:46:42', null, '8d6d20172c0c4acc96da28301c7a3b59', null, '0', '0');
INSERT INTO shirt VALUES ('8b0d3a613a4c431391819f51aacf5e9f', '二恶', '/static/images/2015/08/28/H4IM.jpg', '2015-08-29 22:58:44', null, '8d6d20172c0c4acc96da28301c7a3b59', null, '0', '0');
INSERT INTO shirt VALUES ('8c382937532a489db8e8517b39659d70', '视觉差', '/static/images/tt/tt2.jpg', '2015-08-29 22:43:32', null, '8d6d20172c0c4acc96da28301c7a3b59', null, '0', '0');
INSERT INTO shirt VALUES ('9d23ed40716449a39386ec3dca498ffe', '良安', '/static/images/tt/tt3.jpg', '2015-08-29 22:46:06', null, '8d6d20172c0c4acc96da28301c7a3b59', null, '0', '0');
INSERT INTO shirt VALUES ('eaf084b1eb41410a94b4f3b70108c55c', '泰坦', '/static/images/tt/tt4.jpg', '2015-08-29 22:54:37', null, '8d6d20172c0c4acc96da28301c7a3b59', null, '0', '0');
INSERT INTO shirt VALUES ('f5806df53ae84f4d8dbbd3ac07942621', '测测', '/static/images/tt/tt5.jpg', '2015-08-29 22:50:21', null, '8d6d20172c0c4acc96da28301c7a3b59', null, '0', '0');
INSERT INTO shirt VALUES ('fd56bb862c574a12a76b15445c8bf5e3', '爱情', '/static/images/2015/08/28/S5R9.jpg', '2015-08-29 22:53:23', null, '8d6d20172c0c4acc96da28301c7a3b59', null, '0', '0');

-- ----------------------------
-- Table structure for `topic`
-- ----------------------------
DROP TABLE IF EXISTS `topic`;
CREATE TABLE `topic` (
  `id` varchar(32) NOT NULL DEFAULT '',
  `title` varchar(255) DEFAULT NULL,
  `content` longtext,
  `in_time` datetime DEFAULT NULL,
  `modify_time` datetime DEFAULT NULL,
  `author_id` varchar(32) DEFAULT NULL,
  `reposted` int(11) DEFAULT NULL COMMENT '1：转载 0：原创',
  `top` int(11) DEFAULT NULL COMMENT '1：置顶 0：默认',
  `good` int(11) DEFAULT NULL COMMENT '1：精华 0：默认',
  `gid` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of topic
-- ----------------------------
INSERT INTO topic VALUES ('053e0ecc52c842fea267e669e15705e7', '青花瓷', '佛挡杀佛', '2015-06-17 10:59:38', null, 'b39d893f2eec4d7ca496a9fe00d60644', null, '0', '0', '7cd25765144344a18b1335e2eab0145e');
INSERT INTO topic VALUES ('134252690e164c698d157a18ee2153d3', '长恨歌', '汉皇重色思倾国，御宇多年求不得。杨家有女初长成，养在深闺人未识。\r\n天生丽质难自弃，一朝选在君王侧。回眸一笑百媚生，六宫粉黛无颜色。\r\n春寒赐浴华清池，温泉水滑洗凝脂。侍儿扶起娇无力，始是新承恩泽时。\r\n云鬓花颜金步摇，芙蓉帐暖度春宵。春宵苦短日高起，从此君王不早朝。\r\n\r\n承欢侍宴无闲暇，春从春游夜专夜。后宫佳丽三千人，三千宠爱在一身。\r\n金屋妆成娇侍夜，玉楼宴罢醉和春。姊妹弟兄皆列土，可怜光彩生门户。\r\n遂令天下父母心，不重生男重生女。骊宫高处入青云，仙乐风飘处处闻。\r\n缓歌慢舞凝丝竹，尽日君王看不足。渔阳鼙鼓动地来，惊破霓裳羽衣曲。\r\n\r\n九重城阙烟尘生，千乘万骑西南行。翠华摇摇行复止，西出都门百余里。\r\n六军不发无奈何，宛转蛾眉马前死。花钿委地无人收，翠翘金雀玉搔头。\r\n君王掩面救不得，回看血泪相和流。黄埃散漫风萧索，云栈萦纡登剑阁。\r\n峨嵋山下少人行，旌旗无光日色薄。蜀江水碧蜀山青，圣主朝朝暮暮情。\r\n\r\n行宫见月伤心色，夜雨闻铃肠断声。天旋地转回龙驭，到此踌躇不能去。\r\n马嵬坡下泥土中，不见玉颜空死处。君臣相顾尽沾衣，东望都门信马归。\r\n归来池苑皆依旧，太液芙蓉未央柳。芙蓉如面柳如眉，对此如何不泪垂。\r\n春风桃李花开日，秋雨梧桐叶落时。西宫南内多秋草，落叶满阶红不扫。(花开日 一作：花开夜；南内 一作：南苑)\r\n\r\n梨园弟子白发新，椒房阿监青娥老。夕殿萤飞思悄然，孤灯挑尽未成眠。\r\n迟迟钟鼓初长夜，耿耿星河欲曙天。鸳鸯瓦冷霜华重，翡翠衾寒谁与共。\r\n悠悠生死别经年，魂魄不曾来入梦。临邛道士鸿都客，能以精诚致魂魄。\r\n为感君王辗转思，遂教方士殷勤觅。排空驭气奔如电，升天入地求之遍。\r\n\r\n上穷碧落下黄泉，两处茫茫皆不见。忽闻海上有仙山，山在虚无缥渺间。\r\n楼阁玲珑五云起，其中绰约多仙子。中有一人字太真，雪肤花貌参差是。\r\n金阙西厢叩玉扃，转教小玉报双成。闻道汉家天子使，九华帐里梦魂惊。\r\n揽衣推枕起徘徊，珠箔银屏迤逦开。云鬓半偏新睡觉，花冠不整下堂来。\r\n\r\n风吹仙袂飘飘举，犹似霓裳羽衣舞。玉容寂寞泪阑干，梨花一枝春带雨。(阑 通：栏；飘飘 一作：飘飖)\r\n含情凝睇谢君王，一别音容两渺茫。昭阳殿里恩爱绝，蓬莱宫中日月长。\r\n回头下望人寰处，不见长安见尘雾。惟将旧物表深情，钿合金钗寄将去。\r\n钗留一股合一扇，钗擘黄金合分钿。但教心似金钿坚，天上人间会相见。\r\n\r\n临别殷勤重寄词，词中有誓两心知。七月七日长生殿，夜半无人私语时。\r\n在天愿作比翼鸟，在地愿为连理枝。天长地久有时尽，此恨绵绵无绝期。', '2015-07-07 15:42:57', null, '8d6d20172c0c4acc96da28301c7a3b59', null, '0', '0', '7cd25765144344a18b1335e2eab0145e');
INSERT INTO topic VALUES ('1a3b28f1027847bd90d90a6889296a62', '一条河', '强东流<img alt=\"吐舌头\" src=\"/static/xheditor/xheditor_emot/default/tongue.gif\" />', '2015-06-16 21:17:01', null, '8d6d20172c0c4acc96da28301c7a3b59', null, '0', '0', 'd19424a7cf5f4263aa006e06cc439736');
INSERT INTO topic VALUES ('23cc4bd847f548e6b46ec15485cb36f3', '深夜第二弹', '为什么找不到本身存在的属性<br />', '2015-06-16 21:21:02', null, '8d6d20172c0c4acc96da28301c7a3b59', null, '0', '0', 'd19424a7cf5f4263aa006e06cc439736');
INSERT INTO topic VALUES ('2f71525132b14bc4a2f15472cc163054', 'rrr', '444', '2015-08-30 20:29:48', null, '8d6d20172c0c4acc96da28301c7a3b59', null, '0', '0', '7cd25765144344a18b1335e2eab0145e');
INSERT INTO topic VALUES ('3c2efeb59cca4fb9b8d573e176652b75', '二恶', '我我', '2015-07-07 15:40:56', null, '8d6d20172c0c4acc96da28301c7a3b59', null, '0', '0', '7cd25765144344a18b1335e2eab0145e');
INSERT INTO topic VALUES ('585d8df81a7148f9a27c41b98ce121c5', '孩子', '麦田的守望者', '2015-08-27 16:26:01', null, '8d6d20172c0c4acc96da28301c7a3b59', null, '0', '0', '7cd25765144344a18b1335e2eab0145e');
INSERT INTO topic VALUES ('61e42ac12dc64e7696fbe9afe4727c0e', '爱你一万年', '跑着跑着哎呀跌倒', '2015-06-16 16:27:07', null, '8d6d20172c0c4acc96da28301c7a3b59', null, '0', '0', '7cd25765144344a18b1335e2eab0145e');
INSERT INTO topic VALUES ('74170c565bf34be4852e7dca98e84d41', '深夜第二弹', '为什么找不到本身存在的属性<br />', '2015-06-16 21:19:34', null, '8d6d20172c0c4acc96da28301c7a3b59', null, '0', '0', 'd19424a7cf5f4263aa006e06cc439736');
INSERT INTO topic VALUES ('9a060ada263b46e4a58445e68a1f0d43', '问问企鹅王', '额为我去玩', '2015-06-26 20:19:03', null, '8d6d20172c0c4acc96da28301c7a3b59', null, '0', '0', '509e5081335d44e19c50685d1516e44e');
INSERT INTO topic VALUES ('b0c4274c944b4e459ddd0e539f106c31', '长恨歌', '分附近可侵犯就看到女方家咖啡认为全进口非农及时打开内送达方可为的发生到放款速度就客气', '2015-07-07 15:37:50', null, '8d6d20172c0c4acc96da28301c7a3b59', null, '0', '0', '7cd25765144344a18b1335e2eab0145e');
INSERT INTO topic VALUES ('b62b776278304e8b9a1e5276d35abfdc', '歌唱', '<div align=\"center\"><em><span style=\"font-size:24px;\">东方不亮西方亮啦</span></em><br /><img alt=\"偷笑\" src=\"/static/xheditor/xheditor_emot/default/titter.gif\" /><img alt=\"大哭\" src=\"/static/xheditor/xheditor_emot/default/wail.gif\" /></div>', '2015-06-16 21:14:18', null, '8d6d20172c0c4acc96da28301c7a3b59', null, '0', '0', 'd19424a7cf5f4263aa006e06cc439736');
INSERT INTO topic VALUES ('c4f2a47d2f004f48b53db88c18ec88be', '一条河', '强东流<img alt=\"吐舌头\" src=\"/static/xheditor/xheditor_emot/default/tongue.gif\" />', '2015-06-16 21:18:26', null, '8d6d20172c0c4acc96da28301c7a3b59', null, '0', '0', 'd19424a7cf5f4263aa006e06cc439736');
INSERT INTO topic VALUES ('cb3228f074384be6b889f2d19f891dd4', '歌唱', '<div align=\"center\"><em><span style=\"font-size:24px;\">东方不亮西方亮啦</span></em><br /><img alt=\"偷笑\" src=\"/static/xheditor/xheditor_emot/default/titter.gif\" /><img alt=\"大哭\" src=\"/static/xheditor/xheditor_emot/default/wail.gif\" /></div>', '2015-06-16 21:16:04', null, '8d6d20172c0c4acc96da28301c7a3b59', null, '0', '0', 'd19424a7cf5f4263aa006e06cc439736');
INSERT INTO topic VALUES ('d1462b372b284e98b2b8935a3c422afc', '7月4号', '这里是', '2015-07-04 16:21:32', null, '8d6d20172c0c4acc96da28301c7a3b59', null, '0', '0', '94962e1ed5e74a6598d0e14c1606a10d');
INSERT INTO topic VALUES ('e753e08cfc8b48e89e28462947cfc31a', '三只青蛙', '三只青蛙三张嘴<br />', '2015-06-16 21:25:42', null, '8d6d20172c0c4acc96da28301c7a3b59', null, '0', '0', 'd19424a7cf5f4263aa006e06cc439736');
INSERT INTO topic VALUES ('ea92d40b7e104f37a2b20e03356bdb2d', '额的', '得到', '2015-06-26 12:49:04', null, '8d6d20172c0c4acc96da28301c7a3b59', null, '0', '0', '7cd25765144344a18b1335e2eab0145e');
INSERT INTO topic VALUES ('efe612b4805b443abff90a2c68674a78', '歌唱', '<div align=\"center\"><em><span style=\"font-size:24px;\">东方不亮西方亮啦</span></em><br /><img alt=\"偷笑\" src=\"/static/xheditor/xheditor_emot/default/titter.gif\" /><img alt=\"大哭\" src=\"/static/xheditor/xheditor_emot/default/wail.gif\" /></div>', '2015-06-16 21:15:53', null, '8d6d20172c0c4acc96da28301c7a3b59', null, '0', '0', 'd19424a7cf5f4263aa006e06cc439736');
INSERT INTO topic VALUES ('f6c55ba42f44430ea0757f2b0a18b2fa', '深夜第二弹', '为什么找不到本身存在的属性<br />', '2015-06-16 21:23:09', null, '8d6d20172c0c4acc96da28301c7a3b59', null, '0', '0', 'd19424a7cf5f4263aa006e06cc439736');
INSERT INTO topic VALUES ('f9d91fd5a6b047bcba3f5e0a1bb2d121', '深夜第二弹', '为什么找不到本身存在的属性<br />', '2015-06-16 21:19:38', null, '8d6d20172c0c4acc96da28301c7a3b59', null, '0', '0', 'd19424a7cf5f4263aa006e06cc439736');
INSERT INTO topic VALUES ('fb96675f33394c7f80ef63a1a10539d3', '第二个话题', '奔跑，不织布', '2015-06-16 16:28:40', null, '8d6d20172c0c4acc96da28301c7a3b59', null, '0', '0', '7cd25765144344a18b1335e2eab0145e');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` varchar(32) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `thirdlogin_type` varchar(10) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `expire_time` datetime DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `mission` date DEFAULT NULL,
  `in_time` datetime DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `open_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO user VALUES ('8d383eb987da4200a7c20745b7437be1', '东西南北中五行', null, null, 'f5f2a537e0144da5ab2b836c5ef5d302', null, '/static/images/avatar.jpg', '2015-09-01', '2015-09-01 21:47:55', '13320150901@163.com', 'e10adc3949ba59abbe56e057f20f883e', null);
INSERT INTO user VALUES ('8d6d20172c0c4acc96da28301c7a3b59', '至多', null, null, '336bd67734094e8bbd8be6c5925bc7ea', null, '/static/images/avatar.jpg', '2015-06-16', '2015-06-16 15:54:42', '15129225245@163.com', 'e10adc3949ba59abbe56e057f20f883e', null);
INSERT INTO user VALUES ('b39d893f2eec4d7ca496a9fe00d60644', '今夜打老虎', null, null, '1b02f140145540188a2e7f023699ef87', null, '/static/images/avatar.jpg', '2015-06-17', '2015-06-17 10:45:41', '15542871549@163.com', 'e10adc3949ba59abbe56e057f20f883e', null);
INSERT INTO user VALUES ('dc8b7cc8cb9d4c1c855b1e8984b02d49', 'summer', null, null, '6155d7df36844fd3903b3da885d5d4ea', null, '/static/images/avatar.jpg', '2015-07-05', '2015-07-05 15:21:34', '15145687894@163.com', 'e10adc3949ba59abbe56e057f20f883e', null);
