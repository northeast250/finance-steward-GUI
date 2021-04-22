commit=$(git show --no-patch --format=%B)

if [[ -z $commit ]]
then 
echo "请将该脚本放在git项目的根目录下"
exit 1;
fi


echo "最新一次提交：$commit"

if [[ $commit =~ "^\s*+++" ]]
then 
{ 
  vt=3; 
  vm="重磅版本升级！！！" 
}
else 
{
  if [[ $commit =~ "^\s*++" ]]
  then 
  { 
    vt=2; 
    vm="里程碑版本！"
  }
  else 
    { 
      vt=1;
      vm="版本优化~"
    }
  fi
}
fi

echo "版本更新类型：$vm" 




vf=VERSION.txt

if [[ ! -f "$vf" ]]
then 
{
  echo "当前环境不存在版本文件：$vf"
  echo "正在新建……"
  echo "0.0.0" >> "${vf}"
  echo "新建成功！"
}
else 
{
  echo "正在读取版本文件：$vf"
}
fi


echo "当前版本：$(head -1 $vf)"

echo "正在尝试更新……"

if [[ vt -eq 3 ]] 
then  
perl -pi -pe 's/(\d+)\.(\d+)\.(\d+)/($1+1).".$2.$3"/e' ${vf}
else 
if [[ vt -eq 2 ]]
then 
perl -pi -pe 's/(\d+)\.(\d+)\.(\d+)/"$1.".($2+1).".$3"/e' ${vf}
else 
perl -pi -pe 's/(\d+)\.(\d+)\.(\d+)/"$1.$2.".($3+1)/e' ${vf}
fi 
fi

echo "更新成功！"
echo "更新后版本：$(head -1 $vf)"

echo "MarkShawn2020 @github, 2021-04-22"
