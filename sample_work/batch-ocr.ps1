Add-Type -AssemblyName System.Runtime.WindowsRuntime
[Windows.Storage.StorageFile, Windows.Storage, ContentType=WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.BitmapDecoder, Windows.Foundation, ContentType=WindowsRuntime] | Out-Null
[Windows.Media.Ocr.OcrEngine, Windows.Foundation, ContentType=WindowsRuntime] | Out-Null
$script:asmeth=[System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object { $_.Name -eq 'AsTask' -and $_.IsGenericMethod -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' } | Select-Object -First 1
function Await($op,$type){$task=$script:asmeth.MakeGenericMethod($type).Invoke($null,@($op));$task.Wait();$task.Result}
$engine=[Windows.Media.Ocr.OcrEngine]::TryCreateFromUserProfileLanguages()
$out='D:\个人\政治\sample_work\笔记OCR-待校对.jsonl'
$writer=[System.IO.StreamWriter]::new($out,$false,[System.Text.UTF8Encoding]::new($false))
try {
 for($i=1;$i -le 118;$i++) {
  $file=('D:\个人\政治\sample_work\笔记渲染\page-{0:D3}.png' -f $i)
  while(-not (Test-Path -LiteralPath $file)){Start-Sleep -Milliseconds 500}
  # Wait until the renderer closes the file.
  $success=$false
  for($try=0;$try -lt 40 -and -not $success;$try++){
    try {
      $f=Await ([Windows.Storage.StorageFile]::GetFileFromPathAsync($file)) ([Windows.Storage.StorageFile])
      $stream=Await ($f.OpenAsync([Windows.Storage.FileAccessMode]::Read)) ([Windows.Storage.Streams.IRandomAccessStream])
      $decoder=Await ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)) ([Windows.Graphics.Imaging.BitmapDecoder])
      $bitmap=Await ($decoder.GetSoftwareBitmapAsync()) ([Windows.Graphics.Imaging.SoftwareBitmap])
      $res=Await ($engine.RecognizeAsync($bitmap)) ([Windows.Media.Ocr.OcrResult])
      $lines=@($res.Lines | ForEach-Object { $line=$_; [ordered]@{text=$line.Text;words=@($line.Words | ForEach-Object { [ordered]@{text=$_.Text;x=$_.BoundingRect.X;y=$_.BoundingRect.Y;width=$_.BoundingRect.Width;height=$_.BoundingRect.Height} })} })
      $writer.WriteLine((ConvertTo-Json -InputObject ([ordered]@{page=$i;lines=$lines}) -Depth 9 -Compress));$writer.Flush();$stream.Dispose();$bitmap.Dispose();$success=$true
    } catch {Start-Sleep -Milliseconds 500}
  }
  if(-not $success){$writer.WriteLine((ConvertTo-Json -InputObject @{page=$i;error='OCR failed'} -Compress));$writer.Flush()}
  if($i % 10 -eq 0){Write-Output "OCR $i/118"}
 }
} finally {$writer.Dispose()}
