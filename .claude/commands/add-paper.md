此命令用于在我的主页之中添加一篇文章

## 在 @papers.bib 中添加此paper的信息
请你提取 $1 中的内容生成.bib 格式，以下是参考案例

```
@inproceedings{xu2025terraslam,
  author = {Xu, Jingao and Bala, Mihir and Eiszler, Thomas and Chen, Xiangliang and Dong, Qifei and Chanana, Aditya and Pillai, Padmanabhan and Satyanarayanan, Mahadev},
  booktitle = {Proceedings of the ACM MobiSys},
  title = {TerraSLAM: Towards GPS-Denied Localization},
  year = {2025},
  abbr={ACM MobiSys},
  bibtex_show={true},
  pdf={papers/mobisys25_TerraSLAM.pdf},
  code={https://github.com/cmusatyalab/TerraSLAM},
  talk={https://www.youtube.com/watch?v=MbyfCz3JZPs},
  selected={true},
  mark={conference}
}
```

如果 $2 是 select 的话 （默认为non-select），则类似上面

```
selected={true}
```

pdf, slide, code字段先默认设置为返回当前网页（https://jingao-xu.info）

默认
```
mark={conference}
```
除非我输入了 $3 为 journal


## 添加一个 News
在_news folder中添加一个和其他news 命名格式相同的.md文件

```
---
layout: post
date: 2025-07-01
inline: true
related_posts: false
---

Our work [PRE-Mamba](#) on *raw-data-level* event camera denoising using mamba got accepted by [ICCV 2025](https://iccv.thecvf.com/) 
```
类似上面这样，告诉大家中了一篇文章