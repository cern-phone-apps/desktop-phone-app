cd /root/home
if [ ! -f "appimagetool-x86_64.AppImage" ]; then
    wget "https://github.com/AppImage/AppImageKit/releases/download/12/appimagetool-x86_64.AppImage" 
fi
chmod +x appimagetool-x86_64.AppImage
./cern-phone-app-$(ls -Art cern-phone-app-*-x86_64-linux.AppImage | tail -n 1 | cut -d "-" -f 4)-x86_64-linux.AppImage --appimage-extract
sed -i -e 's|"$BIN"|"$BIN" --no-sandbox|g' squashfs-root/AppRun
sed -i -e 's|^Icon=.*|Icon=cern-phone-app|g'  squashfs-root/cern-phone-app.desktop
./appimagetool-x86_64.AppImage squashfs-root/
mv $(ls -Art cern-phone-app-*-x86_64-linux.AppImage | tail -n 1) cern-phone-app-$(ls -Art cern-phone-app-*-x86_64-linux.AppImage | tail -n 1 | cut -d "-" -f 4)-x86_64-linux-original.AppImage
mv CERN_Phone_App-x86_64.AppImage cern-phone-app-$(ls -Art cern-phone-app-*-x86_64-linux-original.AppImage | tail -n 1 | cut -d "-" -f 4)-x86_64-linux.AppImage
rm -rf squashfs-root