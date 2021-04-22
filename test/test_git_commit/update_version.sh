read -r msg  < ./sample.txt

vf=VERSION.txt

if [[ ! -f "$vf" ]]
then {
    echo "当前环境不存在版本文件：$vf"
    echo "正在新建……"
    echo "0.0.1" >> "${vf}"
    echo "新建成功！"
}
else {
echo "正在读取版本文件：$vf"
}
fi


echo "当前版本：$(head -1 $vf)"

echo "正在尝试更新……"

if echo ${msg} |grep -q '^+++' 
then 
{
  perl -pi -pe 's/(\d+)\.(\d+)\.(\d+)/($1+1).".$2.$3"/e' ${vf}
  echo "[AUTO UPDATE VERSION]: 重大版本升级 ~"
}
else if echo ${msg} |grep -q '^++' 
then
{
  perl -pi -pe 's/(\d+)\.(\d+)\.(\d+)/"$1.".($2+1).".$3"/e' ${vf}
  echo "[AUTO UPDATE]: 较大版本优化 ~"
}
else 
{
  perl -pi -pe 's/(\d+)\.(\d+)\.(\d+)/"$1.$2.".($3+1)/e' ${vf}
  echo "[AUTO UPDATE VERSION]: 更新版本补丁 ~"
}
  fi 
fi

echo "更新完成！"

echo "更新后版本：$(head -1 $vf)"
