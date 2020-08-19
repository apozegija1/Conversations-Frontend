import { Component, OnInit } from '@angular/core';

import {TranslateService} from '@ngx-translate/core';
import {Constants} from '../../models/constants';
import {LocalStorageService} from '../../services/local-storage.service';
import {ILanguageItem} from '../../models/interfaces/ilanguage-item.interface';

@Component({
    templateUrl: 'language-selector.component.html',
    selector: 'app-language-selector',
    styleUrls: ['./language-selector.component.scss']
})

export class LanguageSelectorComponent implements OnInit {
    defaultLanguage: ILanguageItem = {
      img: '/assets/images/gb-flag.png',
      key: Constants.Defaults.Language,
      nameKey: 'english_language'
    };

     languages: ILanguageItem[] = [
       this.defaultLanguage,
      {
        img: '/assets/images/bih-flag.png',
        key: 'bs',
        nameKey: 'bosnian_language'
      }
    ];
     selectedLanguage: ILanguageItem = null;

    constructor(private translate: TranslateService,
                private localStorageService: LocalStorageService) {
      const language: ILanguageItem = this.localStorageService.getItem(Constants.LocalStorageKey.LanguageSelected);
      if (!language) {
        this.selectLanguage(this.defaultLanguage);
      } else {
        this.selectLanguage(language);
      }
    }

    ngOnInit() {

    }

    public selectLanguage(language: ILanguageItem) {
      this.localStorageService.setItem(Constants.LocalStorageKey.LanguageSelected, language);
      this.translate.setDefaultLang(language.key);
      this.selectedLanguage = language;
    }
}
