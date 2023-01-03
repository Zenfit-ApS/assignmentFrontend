import React, { useEffect, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import Delimiter from '@editorjs/delimiter';
import SimpleImage from '@editorjs/simple-image';
import Marker from '@editorjs/marker';
import Quote from '@editorjs/quote';
import LinkTool from '@editorjs/link';
import Table from '@editorjs/table';
import { FormGroup, Select } from '../../components/Form';

import editorMockData from '../../mock/editor';

const DescriptionForm = React.memo(({ plan }) => {
  const [type, setType] = useState('');

  useEffect(() => {
    const editor = new EditorJS({
      holderId: 'meal-plan-editor',
      data: editorMockData,
      tools: {
        /**
         * Each Tool is a Plugin. Pass them via 'class' option with necessary settings {@link docs/tools.md}
         */
        header: {
          class: Header,
          inlineToolbar: ['link'],
          config: {
            placeholder: 'Header'
          },
          shortcut: 'CMD+SHIFT+H'
        },
        image: {
          class: SimpleImage,
          inlineToolbar: ['link'],
        },
        list: {
          class: List,
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+L'
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          config: {
            quotePlaceholder: 'Enter a quote',
            captionPlaceholder: 'Quote\'s author',
          },
          shortcut: 'CMD+SHIFT+O'
        },
        marker: {
          class:  Marker,
          shortcut: 'CMD+SHIFT+M'
        },
        delimiter: Delimiter,
        linkTool: LinkTool,
        table: {
          class: Table,
          inlineToolbar: true,
          shortcut: 'CMD+ALT+T'
        },
      },
    });

    return () => {
      editor.destroy();
    };
  }, []);

  const types = [
    { name: 'Current description', value: '' },
    { name: 'English - Zenfit Meal Description Template', value: 'en' },
    { name: 'Dansk - Zenfit Meal Description Template', value: 'dk' },
  ];

  return (
    <div>
      <FormGroup>
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          {types.map((option, index) => (
            <option value={option.value} key={`type_${index}`}>
              {option.name}
            </option>
          ))}
        </Select>
      </FormGroup>
      <div id="meal-plan-editor"/>
    </div>
  );
});

export default DescriptionForm;
